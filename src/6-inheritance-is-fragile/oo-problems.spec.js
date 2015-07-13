class Device {
  constructor(name) {
    this.name = name || 'Unknown';
  }
}

class Camera extends Device {
  takePicture(name) {
  }

  someOtherFunction(name) {
  }
}

class CameraThatLoadsFilm extends Camera {
  loadFilm() {
  }
}

class Phone extends Device {
  makeCall() {
  }
}

class SmartPhone {
}
