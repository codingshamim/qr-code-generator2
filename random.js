function isRandomMac(macAddress) {
    var secondCharacter = macAddress.charAt(1);
  
    if (
      secondCharacter === "2" ||
      secondCharacter === "6" ||
      secondCharacter === "A" ||
      secondCharacter === "E"
    ) {
     
      return true;
    } else {
      return false;
    }
  }
  