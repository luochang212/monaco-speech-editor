// router
// 利用路由加载设置偏好

function Router() {
  this.routes = {};
  this.currentUrl = '';
}
Router.prototype.route = function (path, callback) {
  this.routes[path] = callback || function () {};
};
Router.prototype.refresh = function () {
  this.currentUrl = location.hash.slice(1) || '/';
  this.routes[this.currentUrl]();
};
Router.prototype.init = function () {
  window.addEventListener('load', this.refresh.bind(this), false);
  window.addEventListener('hashchange', this.refresh.bind(this), false);
};

export function initRouter() {
  var router = new Router();
  window.Router = router;
  router.init();

  router.route('/', function () {
    // do nothing
    // remove this function will cause an error
  });
  router.route('load-demo', function () {
    document.getElementById('load-demo').click();
  });
  router.route('dark', function () {
    document.getElementById('night-mode-input').click();
  });
  router.route('full-screen', function () {
    document.getElementById('left-nav-button-1').click();
    document.getElementById('hide-header').click();
  });
  router.route('run', function () {
    document.getElementById('console-button').click();
  });
  router.route('tutorial', function () {
    setTimeout(() => {
      document.getElementById('audio-tutorial').click();
    }, 1000);
  });
  router.route('spotlight', function () {
    document.getElementById('spot-light-input').click();
  });
  router.route('linear-index', function () {
    document.getElementById('linear-index-input').click();
  });
  router.route('character-mode', function () {
    document.getElementById('character-mode-input').click();
  });
  router.route('code-mode', function () {
    document.getElementById('code-mode-input').click();
  });
  router.route('overview-mode', function () {
    document.getElementById('overview-mode-input').click();
  });
  router.route('voice-feedback', function () {
    document.getElementById('voice-feedback-input').click();
  });
  router.route('voice-cue', function () {
    document.getElementById('voice-cue-input').click();
  });
  router.route('mute', function () {
    document.getElementById('mute-input').click();
  });
  router.route('dark&run', function () {
    document.getElementById('night-mode-input').click();
    document.getElementById('console-button').click();
  });
  router.route('dark&mute', function () {
    document.getElementById('night-mode-input').click();
    document.getElementById('mute-input').click();
  });
}
