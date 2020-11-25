input.onButtonPressed(Button.A, function () {
    プレイヤー.change(LedSpriteProperty.X, -1)
    if (ビーム発射 == false) {
        ビーム.set(LedSpriteProperty.X, プレイヤー.get(LedSpriteProperty.X))
    }
})
input.onButtonPressed(Button.AB, function () {
    ビーム発射 = false
})
input.onButtonPressed(Button.B, function () {
    プレイヤー.change(LedSpriteProperty.X, 1)
    if (ビーム発射 == false) {
        ビーム.set(LedSpriteProperty.X, プレイヤー.get(LedSpriteProperty.X))
    }
})
let スプライト = false
let ビーム発射 = false
let ビーム: game.LedSprite = null
let プレイヤー: game.LedSprite = null
basic.showLeds(`
    # . # . .
    # # # . .
    # . # . #
    . . . # .
    . . . # .
    `)
basic.pause(1000)
game.setScore(0)
let 敵 = game.createSprite(randint(0, 4), 0)
プレイヤー = game.createSprite(2, 4)
ビーム = game.createSprite(2, 4)
ビーム発射 = false
basic.pause(1500)
basic.forever(function () {
    if (game.score() > 5) {
        プレイヤー.delete()
        敵.delete()
        ビーム.delete()
        music.startMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.OnceInBackground)
        basic.showString("クリア！")
    } else if (敵.get(LedSpriteProperty.Y) == 4) {
        music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
        game.gameOver()
    } else if (ビーム.isTouching(敵)) {
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        game.addScore(1)
        敵.set(LedSpriteProperty.X, randint(0, 4))
        敵.set(LedSpriteProperty.Y, 0)
        ビーム.set(LedSpriteProperty.X, プレイヤー.get(LedSpriteProperty.X))
        敵.set(LedSpriteProperty.Y, 4)
        スプライト = false
    }
})
basic.forever(function () {
    敵.change(LedSpriteProperty.X, randint(-1, 1))
    敵.change(LedSpriteProperty.Y, 1)
    basic.pause(1500)
})
basic.forever(function () {
    if (ビーム発射 == true) {
        ビーム.change(LedSpriteProperty.Y, -1)
        basic.pause(100)
        if (ビーム.get(LedSpriteProperty.Y) == 0) {
            ビーム.set(LedSpriteProperty.X, プレイヤー.get(LedSpriteProperty.X))
            ビーム.set(LedSpriteProperty.Y, 4)
            ビーム発射 = false
        }
    }
})
