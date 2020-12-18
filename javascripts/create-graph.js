/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph) {
	Papa.parse("../data/KQTN.csv", {
		download: true,
		complete: function(results) {
			//main graph
			createGraph(results.data);

			//mini graph: temperature - distance
			for (var d=1;d<=4;d++){
				createMiniGraph(results.data,d);
			}
			
		}
	});
}

function createMiniGraph(data, distance){
	var years = [];
	var obj_temp = ["ICE Temperature"];
	var ambient_temp=["Ambient Temperature"];
	var default_ice_temp=["Default ICE Temperature"];
	let cnt=0;

	for (var i = 1; i < data.length; i++) {
		if (data[i][2] == distance){
			years.push(cnt++);
			obj_temp.push(data[i][4]);
			ambient_temp.push(data[i][3]);
			default_ice_temp.push(data[i][1]);
		}
	}
	console.log(distance);
	console.log(years);
	console.log(obj_temp);
	
	var chart= c3.generate({
		bindto: '#miniChart'+distance,
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
                    	max: years.length+3
                	}
				},
				label:"Times",
				max: years.length+1,
				min:0,
				
			},
			y: {
				label: 'Degree C',
				max:40
			}
			
		
		},
	    zoom: {
        	enabled: true
    	},
	    legend: {
	        position: 'right'
		},
		size: {
			height:300, 
			width:500
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
		console.log(data[i][2]);
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
                    	max: 70
                	}
				},
				label:"Times",
				max: years.length+3,
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

parseData(createGraph);