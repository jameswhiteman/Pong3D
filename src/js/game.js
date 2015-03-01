function main()
{
    // Configure the game.
    var view = new View(1600, 900);
    var renderer = createRenderer(view, "highp" true, true, true, true, false, 15, 0xAAAAAA, 1.0);
    var perspective = createPerspective(view, 90, 1, 40000, 800, 800, 800);
    var targetPoint = new Point(0, 0, 0);
    var perspectiveControl = createOrbitPerspectiveControl(renderer, perspective, targetPoint);
    var userInput = new UserInput([UserInput.Keyboard]);
    configureGame(renderer, userInput);
    var scenes = [new SceneMenu(),
        new ScenePong()];
}
