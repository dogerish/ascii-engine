// control animations
// to use it, set draw = the game loop, and then startAnim();
// to stop, use stopAnim();

let animId;
var draw = function() {};
// starts animating
function startAnim() { if (!animId) animId = window.requestAnimationFrame(loopAnim); }
// loop it
function loopAnim()
{
	animId = undefined;
	draw();
	startAnim();
}
// stop animating
function stopAnim()
{
	if (!animId) return;
	window.cancelAnimationFrame(animId);
	animId = undefined;
}
