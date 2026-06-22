/* global React */
// Inline SVG icons — 1.5px stroke, modern lucide-like

const Icon = ({
  children,
  size = 20,
  stroke = "currentColor",
  strokeWidth = 1.6,
  fill = "none"
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: fill,
  stroke: stroke,
  strokeWidth: strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, children);
const Phone = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72a2 2 0 0 1 1.72 2z"
}));
const MessageSquare = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
}));
const Shield = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
}));
const ShieldCheck = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m9 12 2 2 4-4"
}));
const ThumbsUp = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M7 10v12"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7V10l4.66-9.5A1 1 0 0 1 13 1c1.7 0 3 1.3 3 3v1.88z"
}));
const Trophy = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 22h16"
}), /*#__PURE__*/React.createElement("path", {
  d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
}), /*#__PURE__*/React.createElement("path", {
  d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
}), /*#__PURE__*/React.createElement("path", {
  d: "M18 2H6v7a6 6 0 0 0 12 0V2Z"
}));
const Building = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "3",
  width: "18",
  height: "18",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 9h6M9 13h6M9 17h6"
}));
const Truck = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M15 18H9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "17",
  cy: "18",
  r: "2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "7",
  cy: "18",
  r: "2"
}));
const Sparkles = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 3v4M22 5h-4M4 17v2M5 18H3"
}));
const Droplet = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"
}));
const CarFront = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M21 8l-2 6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 8l2 6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 14H3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 14h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 14h14"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 8h14l-1.5-3.5A2 2 0 0 0 15.7 3H8.3a2 2 0 0 0-1.8 1.5z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "7.5",
  cy: "11.5",
  r: ".5",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "16.5",
  cy: "11.5",
  r: ".5",
  fill: "currentColor"
}));
const Calendar = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "4",
  width: "18",
  height: "18",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 2v4M8 2v4M3 10h18"
}));
const Camera = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "13",
  r: "3"
}));
const Check = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
const ChevronRight = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
  points: "9 18 15 12 9 6"
}));
const ChevronLeft = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("polyline", {
  points: "15 18 9 12 15 6"
}));
const ArrowRight = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
  x1: "5",
  y1: "12",
  x2: "19",
  y2: "12"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 5 19 12 12 19"
}));
const Mail = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
  x: "2",
  y: "4",
  width: "20",
  height: "16",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m22 7-10 5L2 7"
}));
const MapPin = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "10",
  r: "3"
}));
const Star = p => /*#__PURE__*/React.createElement(Icon, {
  ...p,
  fill: "currentColor",
  stroke: "currentColor"
}, /*#__PURE__*/React.createElement("polygon", {
  points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
}));
const Upload = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "17 8 12 3 7 8"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "3",
  x2: "12",
  y2: "15"
}));
const X = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
}));
const Menu = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "6",
  x2: "20",
  y2: "6"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "12",
  x2: "20",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "18",
  x2: "20",
  y2: "18"
}));
const Clock = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 6 12 12 16 14"
}));
const Wrench = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
}));
const FileCheck = p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
  d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "14 2 14 8 20 8"
}), /*#__PURE__*/React.createElement("path", {
  d: "m9 15 2 2 4-4"
}));
const Google = p => /*#__PURE__*/React.createElement("svg", {
  width: p.size || 18,
  height: p.size || 18,
  viewBox: "0 0 48 48",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  fill: "#FFC107",
  d: "M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#FF3D00",
  d: "m6.3 14.7 6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 7.1 29.3 5 24 5c-7.7 0-14.4 4.4-17.7 10.7z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#4CAF50",
  d: "M24 43c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8L6.2 32C9.5 38.4 16.2 43 24 43z"
}), /*#__PURE__*/React.createElement("path", {
  fill: "#1976D2",
  d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.2 5.7l6.2 5.2C40.9 35.6 44 30.2 44 24c0-1.2-.1-2.3-.4-3.5z"
}));
Object.assign(window, {
  Icon,
  Phone,
  MessageSquare,
  Shield,
  ShieldCheck,
  ThumbsUp,
  Trophy,
  Building,
  Truck,
  Sparkles,
  Droplet,
  CarFront,
  Calendar,
  Camera,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Mail,
  MapPin,
  Star,
  Upload,
  X,
  Menu,
  Clock,
  Wrench,
  FileCheck,
  Google
});