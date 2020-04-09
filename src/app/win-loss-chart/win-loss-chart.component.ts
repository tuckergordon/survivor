import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as d3 from 'd3';
import { TribeRound, Player } from '../shared/models/survivor.model';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-win-loss-chart',
  templateUrl: './win-loss-chart.component.html',
  styleUrls: ['./win-loss-chart.component.scss']
})
export class WinLossChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') chartRef: ElementRef<SVGSVGElement>;
  private svg: d3.Selection<SVGSVGElement, null, null, null>;

  @Input() tribeRounds: [TribeRound, TribeRound];
  @Input() round: number;
  @Input() resultUnit = 'Time';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  @Input() max?: number;

  private readonly MARGINS = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
  };

  winnerIndex: number;
  chartWidth: number;
  chartHeight: number;
  scaleY: d3.ScaleBand<number>;
  scaleXLeft: d3.ScaleLinear<number, number>;
  scaleXRight: d3.ScaleLinear<number, number>;

  constructor() { }

  ngOnInit(): void {
    if (this.sortDirection === 'desc') {
      this.winnerIndex = this.tribeRounds[0] > this.tribeRounds[1] ? 0 : 1;
    } else {
      this.winnerIndex = this.tribeRounds[0] < this.tribeRounds[1] ? 0 : 1;
    }
  }

  ngAfterViewInit() {
    this.svg = d3.select(this.chartRef.nativeElement);
    setTimeout(() => {
      this.init();
      this.update();
    }, 0);
  }

  init() {
    const svgWidth = this.svg.node().getBoundingClientRect().width;
    const svgHeight = this.svg.node().getBoundingClientRect().height;
    this.chartWidth = svgWidth - this.MARGINS.left - this.MARGINS.right;
    this.chartHeight = svgHeight - this.MARGINS.top - this.MARGINS.bottom;

    this.svg.append('g').attr('class', 'bars-left');
    this.svg.append('g').attr('class', 'bars-right');
  }

  update() {
    let maxResult = this.max;
    if (!this.max) {
      maxResult = d3.max([
        ...this.tribeRounds[0].players.map(player => this.getPlayerScore(player)),
        ...this.tribeRounds[1].players.map(player => this.getPlayerScore(player))
      ]);
    }
    this.scaleXLeft = d3.scaleLinear<number, number>()
      .domain([0, maxResult])
      .range([0, this.chartWidth / 2]);

    this.scaleXRight = d3.scaleLinear<number, number>()
      .domain([0, maxResult])
      .range([0, this.chartWidth / 2]);

    this.scaleY = d3.scaleBand<number>()
      .paddingInner(0.1)
      .domain(d3.range(Math.max(this.tribeRounds[0].players.length, this.tribeRounds[1].players.length)))
      .range([this.MARGINS.top, this.MARGINS.top + this.chartHeight]);

    this.svg.select('.bars-left')
      .selectAll('rect')
      .data(this.tribeRounds[0].players)
      .join(
        enter => enter.append('rect')
          .attr('fill', this.tribeRounds[0].tribe.color)
      )
      .attr('x', d => {
        return this.MARGINS.left + this.chartWidth / 2 - this.scaleXLeft(this.getPlayerScore(d));
      })
      .attr('y', (d, i) => {
        return this.scaleY(i);
      })
      .attr('width', d => this.scaleXLeft(this.getPlayerScore(d)))
      .attr('height', this.scaleY.bandwidth());
    this.svg.select('.bars-right')
      .selectAll('rect')
      .data(this.tribeRounds[1].players)
      .join(
        enter => enter.append('rect')
          .attr('fill', this.tribeRounds[1].tribe.color)
      )
      .attr('x', this.MARGINS.left + this.chartWidth / 2)
      .attr('y', (d, i) => {
        return this.scaleY(i);
      })
      .attr('width', d => this.scaleXRight(this.getPlayerScore(d)))
      .attr('height', this.scaleY.bandwidth());
  }

  // TODO: move to parent component
  sortTotal(total: TribeRound) {
    total.players.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return this.getPlayerScore(a) - this.getPlayerScore(b); // TODO: rounds
      }
      return this.getPlayerScore(b) - this.getPlayerScore(a); // TODO: rounds
    });
    return total;
  }

  getPlayerScore(player: Player): number {
    return DataService.getPlayerScore(player, this.round);
  }
}
