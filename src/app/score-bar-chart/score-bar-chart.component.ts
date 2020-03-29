import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, HostListener } from '@angular/core';
import { Player } from '../shared/models/survivor.model';

import * as d3 from 'd3';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-score-bar-chart',
  templateUrl: './score-bar-chart.component.html',
  styleUrls: ['./score-bar-chart.component.scss']
})
export class ScoreBarChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') chartRef: ElementRef<SVGSVGElement>;
  private svg: d3.Selection<SVGSVGElement, null, null, null>;

  @Input() players: Player[];
  @Input() round: number;
  @Input() resultUnit = 'Time';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';

  private readonly MARGINS = {
    top: 5,
    bottom: 5,
    left: 30,
    right: 50
  };

  chartWidth: number;
  chartHeight: number;
  scaleY: d3.ScaleBand<string>;
  scaleX: d3.ScaleLinear<number, number>;

  constructor() { }

  ngOnInit(): void {
    this.players = this.sortPlayers(this.players);
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

    this.svg.append('g').attr('class', 'bars')
      .attr('transform', `translate(${this.MARGINS.left - 5}, 0)`);
    this.svg.append('g').attr('class', 'labels')
      .attr('transform', `translate(${this.MARGINS.left - 5}, 0)`);
    this.svg.append('g').attr('class', 'axis-y')
      .attr('transform', `translate(${this.MARGINS.left * 2}, 0)`);
  }

  update() {
    this.scaleX = d3.scaleLinear<number, number>()
      .domain([0, d3.max(this.players.map(player => player['round' + this.round]))])
      .range([0, this.chartWidth]);

    this.scaleY = d3.scaleBand<string>()
      .paddingInner(0.1)
      .domain(this.players.map(player => player.name))
      .range([this.MARGINS.top, this.MARGINS.top + this.chartHeight]);

    this.svg.select('.bars')
      .selectAll<SVGRectElement, Player>('rect')
      .data(this.players, player => player.name)
      .join(
        enter => enter.append('rect')
          .attr('fill', player => player.tribe.color)
      )
      .attr('x', this.MARGINS.left)
      .attr('y', d => this.scaleY(d.name))
      .attr('width', d => this.scaleX(d['round' + this.round]))
      .attr('height', this.scaleY.bandwidth());

    this.svg.select('.labels')
      .selectAll<SVGTextElement, Player>('.label')
      .data(this.players, player => player.name)
      .join(
        enter => enter.append('text')
          .attr('class', 'label')
          .text(player => player['round' + this.round])
          .attr('font-size', 10)
      )
      .attr('x', d => this.MARGINS.left + this.scaleX(d['round' + this.round]) + 3)
      .attr('y', d => this.scaleY(d.name) + (this.scaleY.bandwidth() + 10) / 2);

    const axisY = this.svg.select('.axis-y').call(
      d3.axisLeft(this.scaleY).tickFormat(playerName => DataService.getFirstName(playerName)));
    axisY.select('.domain').remove();
    axisY.selectAll('line').remove();
  }

  sortPlayers(players: Player[]) {
    return players.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a['round' + this.round] - b['round' + this.round]; // TODO: rounds
      }
      return b['round' + this.round] - a['round' + this.round]; // TODO: rounds
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const svgWidth = this.svg.node().getBoundingClientRect().width;
    const svgHeight = this.svg.node().getBoundingClientRect().height;
    this.chartWidth = svgWidth - this.MARGINS.left - this.MARGINS.right;
    this.chartHeight = svgHeight - this.MARGINS.top - this.MARGINS.bottom;
    this.update();
  }
}
