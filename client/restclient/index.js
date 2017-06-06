import Vue from 'vue';
import store from 'store';

import config from 'config/rest'

var rest = {
    restBaseUrl: config.url,

    getRestUrl: function(model, options) {
        return this.restBaseUrl + 'api/api/v1/' + model + (options ? options : '');
    },
    getPhotoUploadUrl: function(model) {
        return this.restBaseUrl + 'api/photo/' + model;
    },

    getData(model, options, cb) {
        let _url = this.getRestUrl(model, options);

        Vue.axios.get(
            _url
        ).then(res => {
            let _data = (res.data);
            // store.dispatch('showMessage', 'Received ' + _data.length + ' ' + model + '(s)');
            cb(_data);

        }).catch(function(err) {
            console.log(err);
            var _err = err.response.data;
            store.dispatch('showMessage', _err.flashMessage || _err);
            if (!(_err.signedIn)) {
                setTimeout(function() {
                    Vue.auth.logout();
                }, 1000);
            } else if (!(_err.tokenValid)) {
                Vue.auth.refreshToken();

                var cb = this.getData;
                setTimeout(function() {
                    cb(model);
                }, 1000);
            }
        });
    },
    insertData(data, model, options, cb) {
        let _url = this.getRestUrl(model, options);

        Vue.axios.post(
            _url, data
        ).then(res => {
            let _data = (res.data);
            store.dispatch('showMessage', 'Data updated');
            if (cb) cb(_data);
            return;

        }).catch(function(err) {
            console.log(err);
            if (err.response) {
                var _err = err.response.data;
                store.dispatch('showMessage', _err.flashMessage || _err);
                if (!(_err.signedIn)) {
                    setTimeout(function() {
                        Vue.auth.logout();
                    }, 1000);
                } else if (!(_err.tokenValid)) {
                    Vue.auth.refreshToken();

                    var cb = this.getData;
                    setTimeout(function() {
                        cb(model);
                    }, 1000);
                }

            } else {
                store.dispatch('showMessage', 'Something was not right, when updating your data');
            }
        });
    },
    updateData(data, model, options, cb) {
        let _url = this.getRestUrl(model, options);

        Vue.axios.put(
            _url, data
        ).then(res => {
            let _data = (res);
            store.dispatch('showMessage', 'Data updated');
            if (cb) cb(_data);
            return;

        }).catch(function(err) {
            console.log(err);
            if (err.response) {
                var _err = err.response.data;
                store.dispatch('showMessage', _err.flashMessage || _err);
                if (!(_err.signedIn)) {
                    setTimeout(function() {
                        Vue.auth.logout();
                    }, 1000);
                } else if (!(_err.tokenValid)) {
                    Vue.auth.refreshToken();

                    var cb = this.getData;
                    setTimeout(function() {
                        cb(model);
                    }, 1000);
                }

            } else {
                store.dispatch('showMessage', 'Something was not right, when updating your data');
            }
        });
    },
    putImageUpload(data, model, cb) {
        let _url = this.getPhotoUploadUrl(model);

        if(!data.photo){
            store.dispatch('showMessage', 'Photo not selected for upload');
        }

        var _data = new FormData();
        _data.append('email', data.email);
        _data.append('photo', data.photo);
        var config = {
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(percentCompleted);
            }
        };

        Vue.axios.put(
            _url, _data
        ).then(res => {
            let _data = (res.data);
            store.dispatch('showMessage', _data.flashMessage || 'Photo updated');
            if (cb) cb(_data);
            return;

        }).catch(function(err) {
            console.log(err);
            if (err.response) {
                var _err = err.response.data;
                store.dispatch('showMessage', _err.flashMessage || _err);
                if (_err.signedIn === false) {
                    setTimeout(function() {
                        Vue.auth.logout();
                    }, 1000);
                } else if (_err.tokenValid === false) {
                    Vue.auth.refreshToken();

                    var cb = this.getData;
                    setTimeout(function() {
                        cb(model);
                    }, 1000);
                }

            } else {
                store.dispatch('showMessage', 'Something was not right, when updating your data');
            }
        });
    },

}

export default rest;