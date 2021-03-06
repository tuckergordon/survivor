import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, HostListener, Pipe } from '@angular/core';
import { Player } from '../shared/models/survivor.model';

import * as d3 from 'd3';
import { DataService, SortBy } from '../shared/services/data.service';
import { MinuteSecondsPipe } from '../shared/pipes/minute-seconds.pipe';

@Component({
  selector: 'app-score-bar-chart',
  templateUrl: './score-bar-chart.component.html',
  styleUrls: ['./score-bar-chart.component.scss'],
  providers: [MinuteSecondsPipe]
})
export class ScoreBarChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') chartRef: ElementRef<SVGSVGElement>;
  private svg: d3.Selection<SVGSVGElement, null, null, null>;

  @Input() players: Player[];
  @Input() round: number;
  @Input() resultUnit: 's' | 'm:s' = 's';
  @Input() resultPipe?;  // TODO: type
  @Input() sortDirection: SortBy = SortBy.DESC;

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

  constructor(private minuteSecondsPipe: MinuteSecondsPipe) { }

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
      .domain([0, d3.max(this.players.map(player => DataService.getPlayerScore(player, this.round)))])
      .range([0, this.chartWidth]);

    this.scaleY = d3.scaleBand<string>()
      .paddingInner(0.2)
      .domain(this.players.map(player => player.name))
      .range([this.MARGINS.top, this.MARGINS.top + this.chartHeight]);

    this.svg.select('.bars')
      .selectAll<SVGRectElement, Player>('rect')
      .data(this.players, player => player.name)
      .join(
        enter => enter.append('rect')
          .attr('fill', player => DataService.getPlayerTribe(player, this.round).color)
      )
      .attr('x', this.MARGINS.left)
      .attr('y', d => this.scaleY(d.name))
      .attr('width', d => this.scaleX(DataService.getPlayerScore(d, this.round)))
      .attr('height', this.scaleY.bandwidth());

    this.svg.select('.labels')
      .selectAll<SVGTextElement, Player>('.label')
      .data(this.players, player => player.name)
      .join(
        enter => enter.append('text')
          .attr('class', 'label')
          .text(player => {
            const score = DataService.getPlayerScore(player, this.round);
            return this.resultUnit === 'm:s' ? this.minuteSecondsPipe.transform(score) : score;
          })
          .attr('font-size', 10)
      )
      .attr('x', d => this.MARGINS.left + this.scaleX(DataService.getPlayerScore(d, this.round)) + 3)
      .attr('y', d => this.scaleY(d.name) + (this.scaleY.bandwidth() + 10) / 2);

    const axisY = this.svg.select('.axis-y').call(
      d3.axisLeft(this.scaleY).tickFormat(playerName => DataService.getFirstNameLastInitial(playerName)));
    axisY.select('.domain').remove();
    axisY.selectAll('line').remove();
  }

  sortPlayers(players: Player[]) {
    // tslint:disable-next-line: variable-name
    return players.sort((_a, _b) => {
      const a = DataService.getPlayerScore(_a, this.round);
      const b = DataService.getPlayerScore(_b, this.round);
      return this.sortDirection === SortBy.ASC ? a - b : b - a;
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
