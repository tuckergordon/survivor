import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Player } from '../shared/models/survivor.model';
import { DataService } from '../shared/services/data.service';

import * as d3 from 'd3';

@Component({
  selector: 'app-wiki-paths',
  templateUrl: './wiki-paths.component.html',
  styleUrls: ['./wiki-paths.component.scss']
})
export class WikiPathsComponent implements OnInit {

  @ViewChild('chart') chartRef: ElementRef<SVGSVGElement>;
  private svg: d3.Selection<SVGSVGElement, null, null, null>;

  @Input() players: Player[];
  @Input() round: number;

  private readonly MARGINS = {
    top: 5,
    bottom: 5,
    left: 30,
    right: 75
  };

  chartWidth: number;
  chartHeight: number;
  scaleY: d3.ScaleBand<string>;
  scaleX: d3.ScaleLinear<number, number>;

  constructor() { }

  ngOnInit(): void {
    this.players = this.sortPlayers(this.players);
  }

  init() {
    const svgWidth = this.svg.node().getBoundingClientRect().width;
    const svgHeight = this.svg.node().getBoundingClientRect().height;
    this.chartWidth = svgWidth - this.MARGINS.left - this.MARGINS.right;
    this.chartHeight = svgHeight - this.MARGINS.top - this.MARGINS.bottom;

    this.svg.append('g').attr('class', 'wiki-paths')
      .attr('transform', `translate(${this.MARGINS.left - 5}, 0)`);
    this.svg.append('g').attr('class', 'labels')
      .attr('transform', `translate(${this.MARGINS.left - 5}, 0)`);
    this.svg.append('g').attr('class', 'axis-y')
      .attr('transform', `translate(${this.MARGINS.left * 2}, 0)`);
  }

  getPlayerPath(player: Player) {
    const pathStr = player[`round${this.round}Answer`] as string;
    return pathStr.split(',').slice(1);
  }

  getPlayerTribe(player: Player) {
    return DataService.getPlayerTribe(player, this.round);
  }

  sortPlayers(players: Player[]) {
    // tslint:disable-next-line: variable-name
    return players.sort((a, b) => {
      const aPath = this.getPlayerPath(a);
        const bPath = this.getPlayerPath(b);

      if (aPath.length === bPath.length) {
        for (let i = 0; i < aPath.length; i++) {
          if (aPath[i] !== bPath[i]) {
            return aPath[i].localeCompare(bPath[i]);
          }
        }
        const aTribe = DataService.getPlayerTribe(a, this.round);
        const bTribe = DataService.getPlayerTribe(b, this.round);
        if (aTribe.id === bTribe.id) {
          return a.name.localeCompare(b.name);
        }
        return aTribe.id.localeCompare(bTribe.id);
      }
      return aPath.length - bPath.length;
    });
  }
}
