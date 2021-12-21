d3.csv("films.csv").then(function (data) {
  // console.log(data);
  var movies = data;
  var button = d3.select("#button");
  var form = d3.select("#form");

  button.on("click", runEnter);
  form.on("submit", runEnter);

  function runEnter() {
    d3.select("tbody").html("")
    d3.selectAll("p").classed('noresults', true).html("")
    d3.event.preventDefault();
    var inputElement = d3.select("#user-input");
    var inputValue = inputElement.property("value").toLowerCase().trim();

    //console.log(inputValue.length);
    //console.log(movies);
    if (inputValue.length < 4){
      d3.select("p").classed('noresults2', true).html("<center><strong>Please try using more than 3 characters to avoid too many results!</strong>")
      inputValue = "Something to give no results"
    }
    var filteredData = movies.filter(movies => movies.Year.toLowerCase().trim().includes(inputValue) ||
                                               movies.Title.toLowerCase().trim().includes(inputValue) ||
                                               movies.Subject.toLowerCase().trim().includes(inputValue) ||
                                               movies.Actor.toLowerCase().trim().includes(inputValue) ||
                                               movies.Actress.toLowerCase().trim().includes(inputValue) ||
                                               movies.Director.toLowerCase().trim().includes(inputValue) );
    //console.log(filteredData.length)
    if (filteredData.length === 0 && inputValue !== "Something to give no results"){
      d3.select("p").classed('noresults', true).html("<center><strong>No results. Please check your spelling!</strong>")
    }
    output = _.sortBy(filteredData, 'avg_vote').reverse()

    for (var i = 0; i < filteredData.length; i++) {
      //console.log(output[i]['Title'])
      //console.log(output[i]['Year'])
      d3.select("tbody").insert("tr").html("<td>"+[i+1]+"</td>"+
        "<td>"+(output[i]['Year'])+"</td>"+
        "<td>"+(output[i]['Title'])+"</td>"+
        "<td>"+(output[i]['Subject'])+"</td>"+
        "<td>"+(output[i]['Actor'])+"</td>"+
        "<td>"+(output[i]['Actress'])+"</td>"+
        "<td>"+(output[i]['Director'])+"</td>") }
  };
  window.resizeTo(screen.width,screen.height)

});
