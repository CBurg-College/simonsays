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
    let button = Color.None

    function showColor(color: Color) {
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
        basic.pause(500)
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

    //% block="the color of the button"
    //% block.loc.nl="de kleur van de knop"
    export function buttonColor(): Color {
        return button
    }

    //% block="wait for a button being pressed"
    //% block.loc.nl="wacht tot een knop wordt ingedrukt"
    export function waitButton() {
        let tm = control.millis() + timeout
        button = Color.None
        while (button == Color.None && tm > control.millis()) {
            if (pins.digitalReadPin(DigitalPin.P0) == 1)
                button = Color.Red
            if (pins.digitalReadPin(DigitalPin.P1) == 1)
                button = Color.Yellow
            if (pins.digitalReadPin(DigitalPin.P2) == 1)
                button = Color.Blue
            basic.pause(1)
        }
    }

    //% block="color %ix"
    //% block.loc.nl="kleur %ix"
    export function getColor(ix: number): Color {
        if (ix >= 0 && ix < list.length)
            return list[ix]
        return Color.None
    }

    //% block="show color %ix"
    //% block.loc.nl="toon kleur %ix"
    export function setColor(ix: number) {
        if (ix >= 0 && ix < list.length)
            showColor(list[ix])
        else
            basic.showIcon(IconNames.No)
    }

    //% block="don't show a color"
    //% block.loc.nl="toon geen kleur"
    export function showNoColor() {
        showColor(Color.None)
    }

    //% block="number of colors after each other"
    //% block.loc.nl="aantal kleuren achter elkaar"
    export function colorCount(): number {
        return list.length - 1
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

    //% block="restart the game"
    //% block.loc.nl="start het spel opnieuw"
    export function restart() {
        list = []
        button = Color.None
    }

    //% block="set timeout to %sec seconds"
    //% block.loc.nl="stel de timeout in op %sec seconden"
    export function setTimeout(sec: number) {
        timeout = sec * 1000
    }

}
