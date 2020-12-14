/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph) {
	Papa.parse("../data/kqtn2.csv", {
		download: true,
		complete: function(results) {
			createGraph(results.data);
		}
	});
}

function createGraph(data) {
	var years = [];
	var obj_temp = ["ICE Temperature"];
	var ambient_temp=["Ambient Temperature"];
	var default_ice_temp=["Default ICE Temperature"];

	for (var i = 1; i < data.length-1; i++) {
		years.push(data[i][0]);
		obj_temp.push(data[i][4]);
		ambient_temp.push(data[i][3]);
		default_ice_temp.push(data[i][1]);
	}

	console.log(years);
	console.log(obj_temp);

	//Đồ thị hiển thị theo thứ tự các lần đo: nhiệt độ - lần đo
	var chart = c3.generate({
		bindto: '#chart',
	    data: {
	        columns: [
				obj_temp,
				ambient_temp,
				default_ice_temp
			]
	    },
	    axis: {
	        x: {
	            // type: 'category',
	            categories: years,
	            tick: {
	            	multiline: false,
                	culling: {
                    	max: 25
                	}
				},
				label:"Times",
				max: 25,
				min:1,
				
			},
			y: {
				label: 'Degree C',
				max:45
			}
			
		
		},
		subchart: {
			show: true
		},
	    zoom: {
        	enabled: true
    	},
	    legend: {
	        position: 'right'
		},
		size: {
			height:500, 
			width:1500
		}
	});
}

//Đồ thị hiển thị theo khoảng cách
parseData(createGraph);