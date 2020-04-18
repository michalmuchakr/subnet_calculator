const validatorIP = {
  ip: "",
  error: "",
  checkDotsNumbersFormat() {
    // check ip adress format
    // [NUMBER][DOT][NUMBER][DOT][NUMBER][DOT][NUMBER][SLASH][NUMBER]
    let regexTestStatement = /^[0-9]+[.]+[0-9]+[.]+[0-9]+[.]+[0-9]+[\/]+[0-9][0-9]$/g;

    // test statement
    if (!regexTestStatement.test(this.ip)) {
      return false;
    }
    return true;
  },

  checkRangeOfOctets() {
    const octets = this.ip.split('/')[0].split(".");

    for (let i = 0; i < 4; i++) {
      if (octets[i] < 0 || octets[i] > 255) {
        return false;
      }
    }
    return true;
  },

  checkRangeOfMask() {
    const octets = this.ip.split("/");
    const mask = octets[1];

    if (mask < 0 || mask > 32) {
      return false;
    }
    return true;
  },

  checkIP(ip) {
    this.ip = ip;

    const isMaskOk = this.checkRangeOfMask();
    const isDotNumFormatOk = this.checkDotsNumbersFormat();
    const isRangeOfOctetsOk = this.checkRangeOfOctets();

    if (isMaskOk && isDotNumFormatOk && isRangeOfOctetsOk) {
      return true;
    }
    return false;
  },
}

export default validatorIP;