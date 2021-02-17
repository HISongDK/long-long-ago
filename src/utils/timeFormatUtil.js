export default function timeFormat(time) {
  let d;
  if (time) {
    d = new Date(time);
  } else {
    d = new Date();
  }
  return d.toLocaleString();
}
