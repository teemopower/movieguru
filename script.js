function getMovie(name){
  let movieElement = document.querySelector('.movie-name');
  
  let movieName = '';
  !name ? movieName = movieElement.value : movieName = name; 

  let url = `http://www.omdbapi.com/?apikey=2632e1d1&t=${movieName}`;

  
  callApi(url)
  .then((result) => {
    let data = JSON.parse(result);
    console.log('result',data)
    
    let title = document.querySelector('.movie-title');
    let plot = document.querySelector('.movie-plot');
    let background = document.querySelector('.a');

    title.innerHTML = data.Title;
    plot.innerHTML = data.Plot;
    background.style.backgroundImage = "url('" + data.Poster + "')";

    // chart
    
    let rating = parseInt(data.Ratings[1].Value);
    let opposingRating = 100 - rating;

    let ratingsArray = [rating, opposingRating];

    let sortedValues = ratingsArray.sort((a,b) => {
      return a - b;
    })

    console.log(sortedValues)

    console.log(opposingRating, rating)

    getRatingsChart(rating,opposingRating)
  }, (err) => {
    console.log('err',err)
  })
}

getMovie('angry birds')

function callApi (url){

  return new Promise((resolve, reject) =>{

    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', url, );
    
    xhr.onload  = function (){
      if (xhr.status === 200){
        resolve(xhr.responseText);
      } else {
        reject(xhr.statusText)
      }
    }
    
    xhr.send();
  });
}


//options
var options = {
  responsive: true,
  title: {
    display: true,
    position: "top",
    text: "Critic Ratings",
    fontSize: 18,
    fontColor: "#111"
  },
  legend: {
    display: true,
    position: "top",
    labels: {
      fontColor: "#333",
      fontSize: 16
    }
  },
  plugins: {
    datalabels: {
      color: '#36A2EB',
      formatter: function(value, context) {
      return Math.round(value) + '%';
    },
    
}
  }
};



function getRatingsChart(positive, negative) {
  

  var dataItems = [positive,negative];

  var data = {
    labels: ['Positive', 'Negative'],
    datasets: [
      { 
        data: dataItems,
        borderColor: "black",
        fill: false,
        backgroundColor: [
          "#84d868",
          "#e8a092",
        ]
     }
    ]
  }
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options,
  });
} 