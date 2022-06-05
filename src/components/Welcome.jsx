const Welcome = () => {
    return (
        <div className="welcome">
            <h1>Welcome to Chesserz</h1>
            <p>
                Chesserz is a chess game that you can play with your friends.
                You can play against a computer or another player.
            </p>
            <p>
                To play, click on the board and drag a piece to a new position.
                You can undo moves by clicking the undo button.
            </p>
            <p>
                To create a new game, click the create new game button.
            </p>
            <p>
                To join a game, click the join game button.
            </p>
        </div>
    );
}

export default Welcome;