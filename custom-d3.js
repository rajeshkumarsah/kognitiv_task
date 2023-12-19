function createLineChart() {
    const data1 = [
      { age: "0", count: 1000 },
      { age: "20-30", count: 50 },
      { age: "30-40", count: 500 },
      { age: "40-50", count: 250 },
      { age: "50-60", count: 0 },
      { age: "60+", count: 100 },
    ];
  
    const data2 = [
      { age: "0", count: 250 },
      { age: "20-30", count: 200 },
      { age: "30-40", count: 350 },
      { age: "40-50", count: 200 },
      { age: "50-60", count: 100 },
      { age: "60+", count: 450 },
    ];
  
    // Create SVG graph
    const svg = d3.select("#kog__line-chart");
  
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
  
    // Scale for xscale & yscale 
    const xScale1 = d3
      .scaleBand()
      .domain(["0", "20-30", "30-40", "40-50", "50-60", "60+"])
      .range([margin.left, width + margin.left])
      .padding(-1);
  
    const xScale2 = xScale1.copy(); 
  
    const yScale = d3
      .scaleLinear()
      .domain([0, 1000])
      .range([height + margin.top, margin.top]);
  
    // Create x-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height + margin.top})`)
      .call(d3.axisBottom(xScale1));
  
    // Create y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale).tickValues([0, 250, 500, 750, 1000]))

    // table grid
    
    svg
        .selectAll(".v-line")
        .data(data1)  
        .enter()
        .append("line")
        .attr("class", "grid-line")
        .attr("x1", (d) => xScale1(d.age) + xScale1.bandwidth() / 2)
        .attr("y1", margin.top)
        .attr("x2", (d) => xScale1(d.age) + xScale1.bandwidth() / 2)
        .attr("y2", height + margin.top)
        .attr("stroke", "#d0d0d5c9");

    svg
        .selectAll(".h-line")
        .data([0, 250, 500, 750, 1000])
        .enter()
        .append("line")
        .attr("class", "grid-line")
        .attr("x1", margin.left)
        .attr("y1", (d) => yScale(d))
        .attr("x2", width + margin.left)
        .attr("y2", (d) => yScale(d))
        .attr("stroke", "#d0d0d5c9");

  
    // Create Line 
    const line1 = d3
      .line()
      .x((d) => xScale1(d.age) + xScale1.bandwidth() / 2)
      .y((d) => yScale(d.count));
  
    const line2 = d3
      .line()
      .x((d) => xScale2(d.age) + xScale2.bandwidth() / 2)
      .y((d) => yScale(d.count));
  
    // Add Lines to SVG
    svg
      .append("path")
      .datum(data1)
      .attr("class", "line one")
      .attr("fill", "none")
      .attr("d", line1);
  
    svg
      .append("path")
      .datum(data2)
      .attr("class", "line two")
      .attr("fill", "none")
      .attr("d", line2);

      // Intersection Points
    data1.forEach((d) => {
        const x = xScale1(d.age) + xScale1.bandwidth() / 2;
        const y = yScale(d.count);

        svg.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 4)  // 
        .attr("stroke", "#151d44")
        .attr("fill", "#fff");  //
    });

    data2.forEach((d) => {
        const x = xScale1(d.age) + xScale1.bandwidth() / 2;
        const y = yScale(d.count);

        svg.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 4)  // 
        .attr("stroke", "#22dbd1")
        .attr("fill", "#fff");  //
    });
  }
  
  createLineChart();
  

