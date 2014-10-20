describe("tauChart.Plot", function () {

    var spec;
    var div;
    beforeEach(function () {
        div = document.createElement('div');
        div.innerHTML = '<div id="test-div" style="width: 800px; height: 600px">NODATA</div>';
        document.body.appendChild(div);

        spec = {
            dimensions: {
                x: {type: 'quantitative'},
                y: {type: 'quantitative'}
            },
            spec: {
                unit: {
                    type: 'COORDS.RECT',
                    x: {scaleDim: 'x'},
                    y: {scaleDim: 'y'},
                    unit: [
                        {
                            type: 'ELEMENT.POINT',
                            x: 'x',
                            y: 'y'
                        }
                    ]
                }
            },
            data: [
                {x: 1, y: 2}
            ]
        };
    });

    afterEach(function () {
        div.parentNode.removeChild(div);
    });

    it("should render default content if no data provided", function () {

        var testDiv = document.getElementById('test-div');
        spec.data = [];
        new tauChart.Plot(spec)
            .renderTo(testDiv);

        expect(testDiv.innerHTML).to.equal('NODATA');
    });

    it("should throw exception if target not found", function () {
        expect(function() { new tauChart.Plot(spec).renderTo('#unknown-test-div') }).throw('Target element not found');
    });

    it("should render to target with size (where target = element)", function () {

        new tauChart.Plot(spec)
            .renderTo(document.getElementById('test-div'), { width: 100, height: 100 });

        var svg = d3.select(div).selectAll('svg');

        expect(svg.attr('width')).to.equal('100');
        expect(svg.attr('height')).to.equal('100');
    });

    it("should render to target with size (where target = ID selector)", function () {

        new tauChart.Plot(spec)
            .renderTo('#test-div', { width: 200, height: 100 });

        var svg = d3.select(div).selectAll('svg');

        expect(svg.attr('width')).to.equal('200');
        expect(svg.attr('height')).to.equal('100');
    });

    it("should infer size from target (where target = element)", function () {

        new tauChart.Plot(spec)
            .renderTo(document.getElementById('test-div'));

        var svg = d3.select(div).selectAll('svg');

        expect(svg.attr('width')).to.equal('800');
        expect(svg.attr('height')).to.equal('600');
    });

    it("should infer size from target (where target = ID selector)", function () {

        new tauChart.Plot(spec)
            .renderTo('#test-div');

        var svg = d3.select(div).selectAll('svg');

        expect(svg.attr('width')).to.equal('800');
        expect(svg.attr('height')).to.equal('600');
    });
});