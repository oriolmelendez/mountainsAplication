let app = new Vue({
    el: '#addAction',
    data: {
        dataForm: {}
    },
    mounted: function() {

        _self = this;

    },
    methods: {
        doRequest: function() {

            var name = document.getElementById('name').value;
            var region = document.getElementById('region').value;
            var height = document.getElementById('height').value;
            var latitude = document.getElementById('latitude').value;
            var altitude = document.getElementById('altitude').value;

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var data = JSON.stringify({
                "name": String(name),
                "region": String(region),
                "height": String(height),
                "latitude": String(latitude),
                "altitude": String(altitude)
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: data,
                redirect: 'follow'
            };

            console.log(data);
            console.log(requestOptions);

            fetch("https://localhost:7163/api/Mountain", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log(error));
        }
    }
});