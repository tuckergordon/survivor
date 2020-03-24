import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TribeTotal } from '../shared/models/survivor.model';

import * as d3 from 'd3';

@Component({
  selector: 'app-win-loss-chart',
  templateUrl: './win-loss-chart.component.html',
  styleUrls: ['./win-loss-chart.component.scss']
})
export class WinLossChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') chartRef: ElementRef<SVGSVGElement>;
  private svg: d3.Selection<SVGSVGElement, null, null, null>;

  @Input() totals: [TribeTotal, TribeTotal];
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
    this.totals = this.totals.map(total => this.sortTotal(total)) as [TribeTotal, TribeTotal];
    if (this.sortDirection === 'desc') {
      this.winnerIndex = this.totals[0] > this.totals[1] ? 0 : 1;
    } else {
      this.winnerIndex = this.totals[0] < this.totals[1] ? 0 : 1;
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
        ...this.totals[0].players.map(player => player['round' + this.round]),
        ...this.totals[1].players.map(player => player['round' + this.round])
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
      .domain(d3.range(Math.max(this.totals[0].players.length, this.totals[1].players.length)))
      .range([this.MARGINS.top, this.MARGINS.top + this.chartHeight]);

    this.svg.select('.bars-left')
      .selectAll('rect')
      .data(this.totals[0].players)
      .join(
        enter => enter.append('rect')
          .attr('fill', this.totals[0].color)
      )
      .attr('x', d => {
        return this.MARGINS.left + this.chartWidth / 2 - this.scaleXLeft(d['round' + this.round]);
      })
      .attr('y', (d, i) => {
        return this.scaleY(i);
      })
      .attr('width', d => this.scaleXLeft(d['round' + this.round]))
      .attr('height', this.scaleY.bandwidth());
    this.svg.select('.bars-right')
      .selectAll('rect')
      .data(this.totals[1].players)
      .join(
        enter => enter.append('rect')
          .attr('fill', this.totals[1].color)
      )
      .attr('x', this.MARGINS.left + this.chartWidth / 2)
      .attr('y', (d, i) => {
        return this.scaleY(i);
      })
      .attr('width', d => this.scaleXRight(d['round' + this.round]))
      .attr('height', this.scaleY.bandwidth());
  }

  // TODO: move to parent component
  sortTotal(total: TribeTotal) {
    total.players.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a['round' + this.round] - b['round' + this.round]; // TODO: rounds
      }
      return b['round' + this.round] - a['round' + this.round]; // TODO: rounds
    });
    return total;
  }

}
