window.onload = function() {
  var webvtts = [];
  webvtts.push(new webvtt('test text', 0, 5.04, 'Justin'));
  webvtts.push(new webvtt('2nd test text', 5.041, 100.25));
  console.log((CompileWebVTTFile(webvtts)));
};
