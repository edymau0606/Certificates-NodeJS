class AutoLogout {
    constructor(){
        this.events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];

        this.warn = this.warn.bind(this);
        this.logout = this.logout.bind(this);
        this.resetTimeout = this.resetTimeout.bind(this);

        this.events.forEach((event) => {
            window.addEventListener(event, this.resetTimeout);
        });

        this.setTimeout();
    }

    clearTimeout() {
        if (this.warnTimeout)
            clearTimeout(this.warnTimeout)
        
        if(this.logoutTimeout)
            clearTimeout(this.logoutTimeout)
    }

    setTimeout(){
        this.warnTimeout = setTimeout(this.warn, 20 * 100000);

        this.logoutTimeout = setTimeout(this.logout, 20 * 100000);
    }

    resetTimeout(){
        this.clearTimeout();
        this.setTimeout();
    }

    warn() {
        //alert('You will be logged out automatically in 1 minute. ');
    }

    logout(){
        var data = JSON.stringify({})
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": window.location.origin + "/logout",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": data
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            location.href = window.location.origin
        });

        this.destroy();
    }

    destroy(){
        this.clearTimeout();

        this.events.forEach((event) => {
            window.removeEventListener(event, this.resetTimeout);
        })
    }
}