// おまじない
enchant();

window.onload = function() {
    var game = new Game(640, 640);

    game.onload = function() {
        // 3D 用シーン生成
        var scene = new Scene3D();

        // ライト生成
        var light = new DirectionalLight(); // 平行光源生成
        light.directionZ = -1;              // 向き
        light.color = [1.0, 1.0, 1.0];      // 色
        scene.setDirectionalLight(light);   // sceneにセット

        // カメラ生成
        var camera = new Camera3D();    // カメラ生成
        camera.x = 0;                   // カメラ位置をセット
        camera.y = 0;
        camera.z = -10;
        camera.centerX = 0;             // 注視点をセット
        camera.centerY = 0;
        camera.centerZ = 0;
        scene.setCamera(camera);        // sceneにセット

        // 球体を生成
        var sphere = new Sphere();          // 球体を生成
        sphere.x = sphere.y = sphere.z = 0; // 位置をセット
        scene.addChild(sphere);             // sceneにセット

        // モデルを回転
        var phi     = 0;    // X 軸回転
        var theta   = 0;    // Y 軸回転
        var offsetX = 0;    // touch の offsetX
        var offsetY = 0;    // touch の offsetY
        var matrix  = new mat4.create();    // 回転行列用マトリックスバッファ

        // タッチイベント登録
        game.rootScene.addEventListener('touchstart', function(e) {
            offsetX = e.x;
            offsetY = e.y;
        });
        game.rootScene.addEventListener('touchmove', function(e) {
            // タッチによる回転
            theta += ( e.x - offsetX ) / 160;   // 差分/160だけ回転
            offsetX = e.x;
            phi -= ( e.y - offsetY ) / 160;     // 差分/160だけ回転
            offsetY = e.y;
        });

        // 更新イベント登録
        game.rootScene.addEventListener('enterframe', function(e) {
            var input = game.input;

            // 十字キーによる回転
            if (game.input.up)      { phi += 0.05; }
            if (game.input.down)    { phi -= 0.05; }
            if (game.input.left)    { theta -= 0.05; }
            if (game.input.right)   { theta += 0.05; }

            // Y 軸、X 軸回転行列を生成
            mat4.identity(matrix);          // 単位行列化
            mat4.rotateX(matrix, phi);      // X 軸回転
            mat4.rotateY(matrix, theta);    // Y 軸回転

            // 回転行列をセット
            sphere.rotation = matrix;
        });
    };

    game.start();
};
