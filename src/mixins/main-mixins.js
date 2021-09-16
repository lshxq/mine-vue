import utils from "@/utils/utils.js";

export default {
  filters: {
    dateFilter(date) {
      if (date) {
        return date.format("yyyy-MM-dd :ss");
      }
      return "-";
    },
    genderFilter(gender) {
      return `${gender}` == "1" ? "男" : "女";
    },
    moneyFilter(money) {
      return utils.numberFormat(money, 0, ".", ",");
    },
  },
  data() {
    return {};
  },
  computed: {
    publicPath() {
      return utils.publicPath;
    },
  },
  methods: {
    rateDisplay(rate, num = 100) {
      return `${Math.floor(rate * num * 100) / num}%`;
    },
    moneyDisplay(money = 0) {
      return utils.numberFormat(money, 0, ".", ",");
    },
    longToDate(long) {
      const d = new Date();
      d.setTime(long);
      return d;
    },
    longDateDisplay(long, format = "yyyy-MM-dd hh:mm:ss") {
      if (long) {
        return this.longToDate(long).format(format);
      }
      return "-";
    },
    phoneMask(phone = "") {
      const pp = phone.replace(/\s/g, "");
      if (pp.length > 8) {
        const prefix = pp.substring(0, 3);
        const subfix = pp.substring(pp.length - 4, pp.length);
        let mask = "";
        for (let idx = 7; idx < pp.length; idx++) {
          mask += "X";
        }
        return `${prefix} ${mask} ${subfix}`;
      }
      return pp;
    },
    phoneDisplay(phone = 0) {
      if (phone.length > 10) {
        return `${phone.substring(0, 3)} ${phone.substring(
          3,
          7
        )} ${phone.substring(7, phone.length)}`;
      } else if (phone.length > 7) {
        return `${phone.substring(0, 4)} ${phone.substring(4, phone.length)}`;
      }
    },
    goto(name, data, newWin = false) {
      if (newWin) {
        const rr = this.$router.resolve({
          name,
          ...data,
        });
        open(rr.href);
      } else {
        this.$router.push({
          name,
          ...data,
        });
      }
    },
    back() {
      this.$router.go(-1);
    },
  },
};
