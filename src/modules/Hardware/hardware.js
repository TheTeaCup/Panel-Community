const osu = require('node-os-utils');
const Cache = require('memory-cache');

class Hardware {

    constructor(interval = 5000) {
        this.interval = interval;
    }

    initCache() {
        var that = this;
        setInterval(function () {
            that.updateStats();
            console.log("hi");
        }, this.interval)
    }

    async getStats(cache = true) {
        if (cache) return Cache.get("hardwareStats");

        return {
            system: this.getSystem(cache),
            memory: await this.getMemory(cache),
            cpu: await this.getCpu(cache)
        }
    }

    async updateStats() {
        return Cache.put("hardwareStats", await this.getStats(false));
    }

    async getSystem(cache = true) {

        return {
            os: await osu.os.oos() === "not supported" ? "not available" : await osu.os.oos(),
            platform: await osu.os.platform(),
            ip: await osu.os.ip(),
            hostname: await osu.os.hostname(),
            arch: await osu.os.arch(),
            uptime: await osu.os.uptime()
        }
    }

    async getMemory(cache = true) {
        if (cache) return Cache.get("hardwareStats");

        let mem = await osu.mem.info();

        return {
            usedMB: mem.usedMemMb,
            maxMB: mem.totalMemMb,
            freeMB: mem.freeMemMb
        }
    }

    async getCpu(cache = true) {

        if (cache) return Cache.get("hardwareStats");

        return {
            used: await osu.cpu.usage(),
            free: Number((await osu.cpu.free()).toFixed(2)),
            model: await osu.cpu.model()
        }
    }

}

module.exports = Hardware;
