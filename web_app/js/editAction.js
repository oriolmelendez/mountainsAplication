let app = new Vue({
    el: '#editAction',
    data: {
        listMountains: [],
        mountainInformation: {}
    },
    mounted: function() {

        _self = this;

        var mountainsData = _self.getAllMountains();
        mountainsData.then((data) => {
            _self.listMountains = data;
        });
    },
    methods: {
        getAllMountains: function() {

            return new Promise((resolve, reject) => {

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        resolve(JSON.parse(xhttp.responseText));
                    } else if (this.readyState == 4 && this.status != 200) {
                        reject({});
                    }
                };
                xhttp.open("GET", "https://localhost:7163/api/Mountain", true);
                xhttp.send();

            });
        },
        displayEditMenu: function(id) {

            var _self = this;

            var htmlList = document.getElementById('list-mountains');
            htmlList.classList.add('hide');

            var htmlSinglePage = document.getElementById('editMountain-form');
            htmlSinglePage.classList.remove('hide');

            _self.listMountains.forEach(element => {
                if (element.id == id) {
                    _self.mountainInformation = element;
                }
            });

        },
        deleteItem: function(id) {

            var requestOptions = {
                method: 'DELETE'
            };

            fetch("https://localhost:7163/api/Mountain/" + id, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log(error));
        },
        goBack: function() {
            var htmlList = document.getElementById('editMountain-form');
            htmlList.classList.add('hide');
            var htmlList = document.getElementById('list-mountains');
            htmlList.classList.remove('hide');
        },
        updateInformation: function() {

            var id = document.getElementById('id').value;
            var name = document.getElementById('name').value;
            var region = document.getElementById('region').value;
            var height = document.getElementById('height').value;
            var latitude = document.getElementById('latitude').value;
            var altitude = document.getElementById('altitude').value;

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var data = JSON.stringify({
                "id": id,
                "name": String(name),
                "region": String(region),
                "height": String(height),
                "latitude": String(latitude),
                "altitude": String(altitude)
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: data,
                redirect: 'follow'
            };

            fetch("https://localhost:7163/api/Mountain", requestOptions)
                .then(response => response.text())
                .then(result => function() {
                    console.log(result);
                })
                .catch(error => console.log(error));
        }
    },
    watch: {
        mountainInformation: function() {

            var _self = this;

            document.getElementById('name').value = _self.mountainInformation.name;
            document.getElementById('region').value = _self.mountainInformation.region;
            document.getElementById('height').value = _self.mountainInformation.height;
            document.getElementById('latitude').value = _self.mountainInformation.latitude;
            document.getElementById('altitude').value = _self.mountainInformation.altitude;
            document.getElementById('id').value = _self.mountainInformation.id;
        }
    }
});