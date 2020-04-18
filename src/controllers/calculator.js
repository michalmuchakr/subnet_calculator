const calculator = {
  shortMask: null,
  ip: null,
  broadcastAdress: null,
  maskBinaryArr: null,
  maskFullIpAdressFormated: null,
  ipBinaryArr: null,
  netAdressFormatedString: null,
  fillWithZero(base) {
    let resArr = new Array(8).fill(0);
    return Object.assign(resArr, base).reverse().join("");
  },
  binaryArrayIntoFormatedString(ip) {
    let formatedString = "";

    for (let i = 0; i < 4; i++) {
      const sliceArr = ip.slice(i * 8, i * 8 + 8);

      // string(2) -> number(2)
      const sliceNumberBin = parseInt(sliceArr.join(""), 10);

      // number(2) -> number(10)
      const sliceNumberDec = parseInt(sliceNumberBin, 2);

      formatedString += sliceNumberDec;

      if (i !== 3) {
        formatedString += ".";
      }
    }

    return formatedString;
  },
  convertIpToBinaryArray(ip) {
    // this.ip -> "192.168.1.1"
    // ipArr -> ["192", "168", "1", "1"]
    const ipArr = ip.split(".");
    const ipBinaryArr = new Array(32);

    for (let i = 0; i < 4; i++) {
      // need parse to number
      const parsedIntIpArrEl = parseInt(ipArr[i], 10);
      let convertedToBinary = parsedIntIpArrEl.toString(2);

      // e.g. (1).toString(2) returns 1, need '00000001'.length = 8
      if (convertedToBinary.length < 8) {
        convertedToBinary = this.fillWithZero(convertedToBinary);
      }

      for (let j = 0; j < 8; j++) {
        ipBinaryArr[8 * i + j] = parseInt(convertedToBinary[j], 10);
      }
    }

    this.ipBinaryArr = ipBinaryArr;
  },
  convertShotMaskToBinary() {
    const maskBinaryArr = new Array(32).fill(0);
    const shortMask = parseInt(this.shortMask, 10);

    for (let i = 0; i < shortMask; i++) {
      maskBinaryArr[i] = 1;
    }

    this.maskBinaryArr = maskBinaryArr;
    this.maskFullIpAdressFormated = this.binaryArrayIntoFormatedString(
      maskBinaryArr
    );
  },
  getNetAdressBinaryArr() {
    const netAdressBinaryArr = new Array(32);

    for (let i = 0; i < 32; i++) {
      netAdressBinaryArr[i] = this.maskBinaryArr[i] * this.ipBinaryArr[i];
    }

    return netAdressBinaryArr;
  },
  calcNetAdress() {
    let netAdressFormatedString = null;

    this.convertIpToBinaryArray(this.ip);
    this.convertShotMaskToBinary();

    const netAdressBinaryArr = this.getNetAdressBinaryArr();
    netAdressFormatedString = this.binaryArrayIntoFormatedString(
      netAdressBinaryArr
    );

    // save & return
    this.netAdressFormatedString = netAdressFormatedString;
    return netAdressFormatedString;
  },
  calcBroadcastAdress() {
    let broadcastAdressFormatedString = "";
    let negatMaskBinaryArr = new Array(32);

    for (let i = 0; i < 32; i++) {
      // NOT operation on every element of shortMask binary array
      negatMaskBinaryArr[i] = Math.abs(this.maskBinaryArr[i] - 1);
    }

    let negatMaskFormatedString = this.binaryArrayIntoFormatedString(
      negatMaskBinaryArr
    );

    // add two ip strings
    let negatMaskFormatedArr = negatMaskFormatedString.split(".");
    let maskNetAdressFormatedArr = this.netAdressFormatedString.split(".");

    for (let i = 0; i < 4; i++) {
      broadcastAdressFormatedString +=
        parseInt(negatMaskFormatedArr[i], 10) +
        parseInt(maskNetAdressFormatedArr[i], 10);

      if (i !== 3) {
        broadcastAdressFormatedString += ".";
      }
    }

    // save & return
    this.broadcastAdressFormatedString = broadcastAdressFormatedString;
    return broadcastAdressFormatedString;
  },
  calcMaxAmmountOfHosts() {
    return Math.pow(2, 32 - parseInt(this.shortMask, 10)) - 2;
  },
  formatedAdressStringFromFormatedArr(baseFormatedAdressArr) {
    let result = "";

    for (let i = 0; i < 4; i++) {
      result += baseFormatedAdressArr[i];
      if (i !== 3) {
        result += ".";
      }
    }

    return result;
  },
  calcFirstHostAdress() {
    const netAdressFormatedArr = this.netAdressFormatedString.split(".");
    netAdressFormatedArr[3] = parseInt(netAdressFormatedArr[3], 10) + 1;
    return this.formatedAdressStringFromFormatedArr(netAdressFormatedArr);
  },
  calcLastHostAdress() {
    const broadcastAdressFormatedArr = this.broadcastAdressFormatedString.split(".");
    broadcastAdressFormatedArr[3] = parseInt(broadcastAdressFormatedArr[3], 10) - 1;
    return this.formatedAdressStringFromFormatedArr(broadcastAdressFormatedArr);
  },
  calcAdressClass() {
    const firstOctet = parseInt(this.ip.split(".")[0], 10);

    switch (true) {
      case 127 > firstOctet:
        return "A";
      case firstOctet === 127:
        return "localhost";
      case firstOctet < 127 && 192 > firstOctet:
        return "B";
      case firstOctet <= 192 && 224 > firstOctet:
        return "C";
      case firstOctet <= 224 && 240 > firstOctet:
        return "D";
      case firstOctet <= 240 && 247 > firstOctet:
        return "E";
      case firstOctet <= 247 && 255 >= firstOctet:
        return "F";
      default:
        return "";
    }
  },
  init(ip) {
    const ipMaskArr = ip.split("/");
    this.ip = ipMaskArr[0];
    this.shortMask = ipMaskArr[1];

    return {
      netAdressFormatedString: this.calcNetAdress(),
      fullMaskAdressFormatedString: this.maskFullIpAdressFormated,
      broadcastAdressFormatedString: this.calcBroadcastAdress(),
      maxAmmountOfHosts: this.calcMaxAmmountOfHosts(),
      firstHostAdress: this.calcFirstHostAdress(),
      lastHostAdress: this.calcLastHostAdress(),
      adressClass: this.calcAdressClass(),
    };
  },
};

export default calculator;