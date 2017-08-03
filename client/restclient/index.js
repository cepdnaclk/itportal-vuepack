import Vue from 'vue';
import store from 'store';

import config from 'config/rest'

var rest = {
    restBaseUrl: config.url,

    loaderCount: 0,

    getRestUrl: function(model, options) {
        return this.restBaseUrl + 'api/api/v1/' + model + (options ? options : '');
    },
    getPhotoUploadUrl: function(model) {
        return this.restBaseUrl + 'api/photo/' + model;
    },
    getResumeUploadUrl: function() {
        return this.restBaseUrl + 'api/resume/student';
    },

    getData(model, options, cb) {
        let _url = this.getRestUrl(model, options);
        let vm = this;

        if(vm.loaderCount == 0) store.dispatch('showLoader', 'Retrieving Data');
        vm.loaderCount++;

        Vue.axios.get(
            _url
        ).then(res => {
            console.log(res);
            let _data = (res.data);
            // store.dispatch('showMessage', 'Received ' + _data.length + ' ' + model + '(s)');
            cb(_data);

            vm.loaderCount--;
            if(vm.loaderCount == 0) store.dispatch('hideLoader');


        }).catch(function(err) {
            console.log(err);
            var _err = err.response.data;

            vm.loaderCount--;
            if(vm.loaderCount == 0) store.dispatch('hideLoader');

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
            } else {

                setTimeout(function() {
                    Vue.auth.logout();
                }, 1000);

            }
        });
    },
    insertData(data, model, options, cb) {
        let _url = this.getRestUrl(model, options);
        let vm = this;

        if(vm.loaderCount == 0) store.dispatch('showLoader', 'Adding new data');
        vm.loaderCount++;

        Vue.axios.post(
            _url, data
        ).then(res => {
            let _data = (res.data);

            vm.loaderCount--;
            if(vm.loaderCount == 0) store.dispatch('hideLoader');

            store.dispatch('showMessage', 'Data updated');
            if (cb) cb(_data);
            return;

        }).catch(function(err) {
            console.log(err);
            if (err.response) {
                var _err = err.response.data;

                vm.loaderCount--;
                if(vm.loaderCount == 0) store.dispatch('hideLoader');

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
        let vm = this;

        Vue.axios.patch(
            _url, data
        ).then(res => {
            let _data = (res);

            vm.loaderCount--;
            if(vm.loaderCount == 0) store.dispatch('hideLoader');

            store.dispatch('showMessage', 'Data updated');
            if (cb) cb(_data);
            return;

        }).catch(function(err) {
            console.log(err);

            vm.loaderCount--;
            if(vm.loaderCount == 0) store.dispatch('hideLoader');

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
        let vm = this;
        if(!data.photo){
            store.dispatch('showMessage', 'Photo not selected for upload');
        }

        if(vm.loaderCount == 0) {store.dispatch('showLoader', 'Uploading Image');}
        vm.loaderCount++;


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

            vm.loaderCount--;
            if(vm.loaderCount == 0) store.dispatch('hideLoader');

            store.dispatch('showMessage', _data.flashMessage || 'Photo updated');
            if (cb) cb(_data);
            return;

        }).catch(function(err) {
            console.log(err);
            if (err.response) {
                var _err = err.response.data;

                vm.loaderCount--;
                if(vm.loaderCount == 0) store.dispatch('hideLoader');

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
    putResumeUpload(data, cb) {
        let _url = this.getResumeUploadUrl();
        let vm = this;
        if(!data.resume){
            store.dispatch('showMessage', 'Photo not selected for upload');
        }

        if(vm.loaderCount == 0) {store.dispatch('showLoader', 'Uploading your resume...');}
        vm.loaderCount++;


        var _data = new FormData();
        _data.append('student_id', data.student_id);
        _data.append('email', data.student_id);
        _data.append('resume', data.resume);
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

            vm.loaderCount--;
            if(vm.loaderCount == 0) store.dispatch('hideLoader');

            store.dispatch('showMessage', _data.flashMessage || ' Resume updated.');
            if (cb) cb(_data);
            return;

        }).catch(function(err) {
            console.log(err);
            if (err.response) {
                var _err = err.response.data;

                vm.loaderCount--;
                if(vm.loaderCount == 0) store.dispatch('hideLoader');

                store.dispatch('showMessage', _err.flashMessage || _err);
                if (_err.signedIn === false) {
                    setTimeout(function() {
                        Vue.auth.logout();
                    }, 1000);
                } else if (_err.tokenValid === false) {
                    Vue.auth.refreshToken();

                    var cb = this.getData;
                    setTimeout(function() {
                        cb();
                    }, 1000);
                }

            } else {
                store.dispatch('showMessage', 'Something was not right, when updating your data');
            }
        });
    },


    updatePreferences_state(_preference, cb) {
        let _url = this.restBaseUrl + '/api/company/companyPreferences/set/status';
        let vm = this;

        let _data = {
            preference: _preference
        };
        Vue.axios.post(
            _url, _data
        ).then(res => {
            let _data = (res);
            console.log('updated preference state data...')
            console.log(_data);
            cb();
            return;
        }).catch(function(err) {
            console.log(err);
        });
    },

}

export default rest;