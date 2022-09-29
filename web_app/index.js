let app = new Vue({
    el: '#app',
    data: {
        mountains: [],
        mountainInformation: {},
    },
    mounted: function() {

        _self = this;

        var mountainsData = _self.getAllMountains();
        mountainsData.then((data) => {
            _self.mountains = data;
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
        displayMountainInformation: function(id) {

            var _self = this;

            var htmlList = document.getElementById('list-mountains');
            htmlList.classList.add('hide');

            var htmlSinglePage = document.getElementById('information-mountain');
            htmlSinglePage.classList.remove('hide');

            var mountainInfo = _self.getMountainInformation(id);
            mountainInfo.then((data) => {
                _self.mountainInformation = data;
            });



        },
        getMountainInformation: function(id) {

            return new Promise((resolve, reject) => {

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        resolve(JSON.parse(xhttp.responseText));
                    } else if (this.readyState == 4 && this.status != 200) {
                        reject({});
                    }
                };
                xhttp.open("GET", "https://localhost:7163/api/Mountain/" + id, true);
                xhttp.send();

            });

        },
        goBack: function() {
            var htmlList = document.getElementById('information-mountain');
            htmlList.classList.add('hide');
            var htmlList = document.getElementById('list-mountains');
            htmlList.classList.remove('hide');
        }
    },
    watch: {

        mountains: function() {
            var _self = this;

            _self.mountains.forEach(element => {
                console.log(element);
            });
        }

    }
});