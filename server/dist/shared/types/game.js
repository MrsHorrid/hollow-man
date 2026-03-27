"use strict";
// Shared game types between client and server
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEvents = exports.MonsterState = exports.GamePhase = void 0;
var GamePhase;
(function (GamePhase) {
    GamePhase["LOBBY"] = "lobby";
    GamePhase["PLAYING"] = "playing";
    GamePhase["GAME_OVER"] = "game_over";
    GamePhase["WIN"] = "win";
})(GamePhase || (exports.GamePhase = GamePhase = {}));
var MonsterState;
(function (MonsterState) {
    MonsterState["IDLE"] = "idle";
    MonsterState["STALKING"] = "stalking";
    MonsterState["HUNTING"] = "hunting";
    MonsterState["TELEPORTING"] = "teleporting";
    MonsterState["ATTACKING"] = "attacking";
})(MonsterState || (exports.MonsterState = MonsterState = {}));
// Socket event types
var SocketEvents;
(function (SocketEvents) {
    // Client -> Server
    SocketEvents["JOIN_ROOM"] = "join_room";
    SocketEvents["LEAVE_ROOM"] = "leave_room";
    SocketEvents["PLAYER_MOVE"] = "player_move";
    SocketEvents["COLLECT_PAGE"] = "collect_page";
    SocketEvents["PUZZLE_INTERACT"] = "puzzle_interact";
    SocketEvents["PLAYER_DIED"] = "player_died";
    SocketEvents["VOICE_DATA"] = "voice_data";
    SocketEvents["PLAYER_LOOKING_AT_MONSTER"] = "player_looking_at_monster";
    // Server -> Client
    SocketEvents["ROOM_STATE"] = "room_state";
    SocketEvents["PLAYER_JOINED"] = "player_joined";
    SocketEvents["PLAYER_LEFT"] = "player_left";
    SocketEvents["GAME_START"] = "game_start";
    SocketEvents["GAME_OVER"] = "game_over";
    SocketEvents["GAME_WIN"] = "game_win";
    SocketEvents["MONSTER_UPDATE"] = "monster_update";
    SocketEvents["PAGE_COLLECTED"] = "page_collected";
    SocketEvents["PUZZLE_UPDATE"] = "puzzle_update";
    SocketEvents["JUMPSCARE"] = "jumpscare";
    SocketEvents["AMBIENT_EVENT"] = "ambient_event";
    SocketEvents["VOICE_RECEIVE"] = "voice_receive";
    SocketEvents["PLAYER_SCREAMED"] = "player_screamed";
})(SocketEvents || (exports.SocketEvents = SocketEvents = {}));
