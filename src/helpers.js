export default {
    methods: {
        truncateParagraph: function (text, limit) {
            if (text.length > limit)
                for (let i = limit; i > 0; i--) {
                    if (text.charAt(i) === ' ' && (text.charAt(i - 1) != ',' || text.charAt(i - 1) != '.' || text.charAt(i - 1) != ';')) {
                        return text.substring(0, i) + '...';
                    }
                }
            else
                return text;
        },
        sleep(delay, func) {
            delay = parseInt(delay)
            delay = delay * 1000
            setTimeout(() => {
                func ? func() : null;
            }, delay)
        },
        pause: function (delay, func) {
            let start = new Date().getTime();
            while (new Date().getTime() < start + delay);
            if (func) func()
        },
        print(text, debug) {
            // for debug in html
            console.log(text)
            if (debug) {
                debugger
            }
        },
        range(start, end) {
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }


    }
};

