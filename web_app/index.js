let app = new Vue({
    el: '#app',
    data: {
        mountains: []
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

        }
    }
});