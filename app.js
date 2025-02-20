var app = angular.module("chatApp", []);

app.controller("ChatController", function ($scope, $timeout) {
    $scope.messages = [];

    $scope.sendMessage = function () {
        if ($scope.message.trim() !== "") {
            // Add user's message
            $scope.messages.push({ text: $scope.message, isMe: true, username: "Me" });

            // Simulate an automatic reply after a short delay
            $timeout(function () {
                $scope.messages.push({ text: "This is an auto-reply!", isMe: false, username: "Bot" });
            }, 1000);

            // Clear input field
            $scope.message = "";
        }
    };
});
