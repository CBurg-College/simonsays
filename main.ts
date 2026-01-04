////////////////////
//################//
//##            ##//
//## SIMON SAYS ##//
//##            ##//
//################//
////////////////////

//% color="#00CC00" icon="\uf075"
//% block="Simon says"
//% block.loc.nl="Simon says"
namespace Simon {

    let list: Color[] = []
    let timeout = 3000

    function showColor(color: Color) {
        switch (color) {
            case Color.Red:
                pins.digitalWritePin(DigitalPin.P14, 1)
                pins.digitalWritePin(DigitalPin.P15, 0)
                pins.digitalWritePin(DigitalPin.P16, 0)
                break;
            case Color.Yellow:
                pins.digitalWritePin(DigitalPin.P14, 1)
                pins.digitalWritePin(DigitalPin.P15, 1)
                pins.digitalWritePin(DigitalPin.P16, 0)
                break;
            case Color.Blue:
                pins.digitalWritePin(DigitalPin.P14, 0)
                pins.digitalWritePin(DigitalPin.P15, 0)
                pins.digitalWritePin(DigitalPin.P16, 1)
                break;
        }
    }

    //% block="set timeout to %sec seconds"
    //% block.loc.nl="stel de timeout in op %sec seconden"
    export function setTimeout(sec: number) {
        timeout = sec
    }

    //% block="add a color"
    //% block.loc.nl="voeg een kleur toe"
    export function addColor() {
        let clr = General.randomInt(0, 2)
        switch (clr) {
            case 0: list.push(Color.Red); break;
            case 1: list.push(Color.Yellow); break;
            case 2: list.push(Color.Blue); break;
        }
    }

    //% block="number of colors"
    //% block.loc.nl="aantal kleuren"
    export function colorCount(): number {
        return list.length
    }

    //% block="show color %ix"
    //% block.loc.nl="toon kleur %ix"
    export function setColor(ix: number) {
        if (ix >= 0 && ix < list.length)
            showColor(list[ix])
    }

    //% block="show color %ix"
    //% block.loc.nl="toon kleur %ix"
    export function getColor(ix: number): Color {
        if (ix >= 0 && ix < list.length)
            return list[ix]
        return Color.None
    }

    //% block="wait for a button"
    //% block.loc.nl="wacht op een knop"
    export function waitButton(): Color {
        let tm = control.millis() + timeout
        while (tm > control.millis()) {
            if (pins.digitalReadPin(DigitalPin.P0))
                return Color.Red
            if (pins.digitalReadPin(DigitalPin.P1))
                return Color.Yellow
            if (pins.digitalReadPin(DigitalPin.P2))
                return Color.Blue
            basic.pause(1)
        }
        return Color.None
    }
}
