import React, { useState } from "react";
import "../mlayout/media.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const adaptive="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'></rect>%0A<rect x='3' y='3' width='65' height='36' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='118.5' y='70' width='17' height='16' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='3' y='41' width='43' height='27' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='4.5' y='70' width='17' height='16' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='42.5' y='70' width='17' height='16' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80.5' y='70' width='17' height='16' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='23.5' y='70' width='17' height='16' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='61.5' y='70' width='17' height='16' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='99.5' y='70' width='17' height='16' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='48' y='41' width='44' height='27' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='94' y='41' width='43' height='27' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='70' y='3' width='67' height='36' rx='2' fill='%23BBBFC3'></rect></svg>";
const sf1="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%2387919a' stroke='%23BBBFC3'></rect>%0A<rect x='9' y='12' width='124' height='65' rx='2' fill='%23BBBFC3'></rect></svg>";
const sf2="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'></rect>%0A<rect x='8' y='8' width='124' height='71' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='12' y='51' width='41' height='24' rx='2' fill='%23ffffff'></rect>%0A</svg>";
const sf3="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'></rect>%0A<rect x='33' y='12.1044' width='74' height='45.3913' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='4' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='23' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='42' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='61' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='99' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='118' y='66' width='18' height='14' rx='2' fill='%23BBBFC3'></rect></svg>";
const es1="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A%09<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'/>%0A%09<rect x='8.0' y='27.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='72.5' y='27.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>%0A</svg>";
const es2="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A%09<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'/>%0A%09<rect x='8.0' y='8.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='72.5' y='8.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='40.25' y='46.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>%0A</svg>";
const es3="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'></rect>%0A<rect x='8' y='12' width='58' height='29' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='8' y='49' width='58' height='29' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='74' y='12' width='58' height='29' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='74' y='49' width='58' height='29' rx='2' fill='%23BBBFC3'></rect></svg>";
const es4="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'></rect>%0A<rect x='8' y='9.81982' width='38.6231' height='19.9617' rx='2.03279' fill='%23BBBFC3'></rect>%0A<rect x='8' y='33.3873' width='38.6231' height='19.9617' rx='2.03279' fill='%23BBBFC3'></rect>%0A<rect x='8' y='56.9551' width='38.6231' height='19.9617' rx='2.03279' fill='%23BBBFC3'></rect>%0A<rect x='50.6875' y='9.81982' width='38.6231' height='19.9617' rx='2.03279' fill='%23BBBFC3'></rect>%0A<rect x='50.6875' y='33.3873' width='38.6231' height='19.9617' rx='2.03279' fill='%23BBBFC3'></rect>%0A<rect x='50.6875' y='56.9551' width='38.6231' height='19.9617' rx='2.03279' fill='%23BBBFC3'></rect>%0A<rect x='92.3594' y='9.81982' width='39.6395' height='19.9617' rx='2.03279' fill='%23BBBFC3'></rect>%0A<rect x='92.3594' y='33.3873' width='39.6395' height='19.9617' rx='2.03279' fill='%23BBBFC3'></rect>%0A<rect x='92.3594' y='56.9551' width='39.6395' height='19.9617' rx='2.03279' fill='%23BBBFC3'></rect></svg>";
const es5="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'></rect>%0A<rect x='41.1016' y='63.8228' width='27.2728' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='71.1953' y='29.2743' width='27.9905' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='11' y='29.2743' width='27.2728' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='11' y='12' width='27.2728' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='11' y='46.5486' width='27.2728' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='11' y='63.8228' width='27.2728' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='41.1016' y='29.2743' width='27.2728' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='41.1016' y='12' width='27.2728' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='41.1016' y='46.5486' width='27.2728' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='71.1953' y='12' width='27.9905' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='102.008' y='29.2743' width='27.9905' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='102.008' y='12' width='27.9905' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='102.008' y='46.5486' width='27.9905' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='102.008' y='63.8228' width='27.9905' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='71.1953' y='46.5486' width='27.9905' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect>%0A<rect x='71.1953' y='63.8228' width='27.9905' height='14.3541' rx='1.43541' fill='%23BBBFC3'></rect></svg>";
const es6="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'></rect>%0A<rect x='31.0859' y='67.6501' width='23.6379' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='57.1717' y='37.7063' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='5' y='37.7063' width='23.6379' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='5' y='22.7343' width='23.6379' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='5' y='8' width='23.6379' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='5' y='52.6782' width='23.6379' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='5' y='67.6501' width='23.6379' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='31.0859' y='37.7063' width='23.6379' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='31.0859' y='22.7344' width='23.6379' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='31.0859' y='8' width='23.6379' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='31.0859' y='52.6782' width='23.6379' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='57.1717' y='22.7343' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='57.1717' y='8' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='83.8828' y='37.7063' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='110.742' y='37.7063' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='83.8828' y='22.7344' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='83.8828' y='8' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='110.742' y='22.7344' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='110.742' y='8' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='83.8828' y='52.6782' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='110.742' y='52.6782' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='83.8828' y='67.6501' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='110.742' y='67.6501' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='57.1717' y='52.6782' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect>%0A<rect x='57.1717' y='67.6501' width='24.26' height='12.441' rx='1.2441' fill='%23BBBFC3'></rect></svg>";
const lg1="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'></rect>%0A<rect x='5' y='5' width='63' height='39' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='72' y='5' width='63' height='39' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='23.7891' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='23.7891' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='42.5703' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='42.5703' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='61.3594' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='61.3594' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='98.9297' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='98.9297' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80.1484' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80.1484' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='117.719' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='117.719' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='23.7891' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='42.5703' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='61.3594' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='98.9297' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80.1484' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='117.719' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect></svg>";
const lg2="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A%09<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'/>%0A%09<rect x='8.0' y='27.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='72.5' y='27.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='8.0' y='8.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='40.25' y='8.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='72.5' y='8.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='104.75' y='8.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='8.0' y='65.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='40.25' y='65.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='72.5' y='65.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='104.75' y='65.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A</svg>";
const lg3="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A%09<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'/>%0A%09<rect x='33.8' y='8.0' width='98.2' height='56.8' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='8.0' y='8.0' width='20.8' height='11.2' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='8.0' y='23.2' width='20.8' height='11.2' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='8.0' y='38.4' width='20.8' height='11.2' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='8.0' y='53.599999999999994' width='20.8' height='11.2' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='8.0' y='68.8' width='20.8' height='11.2' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='33.8' y='68.8' width='20.8' height='11.2' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='59.6' y='68.8' width='20.8' height='11.2' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='85.4' y='68.8' width='20.8' height='11.2' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='111.2' y='68.8' width='20.8' height='11.2' rx='2' fill='%23BBBFC3'/>%0A</svg>";
const lg4="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A<rect x='0.5' y='0.5' width='139' height='887' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'></rect>%0A<rect x='5' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='23.7891' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='23.7891' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='42.5703' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='42.5703' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='61.3594' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='61.3594' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='98.9297' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='98.9297' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80.1484' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80.1484' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='117.719' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='117.719' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='23.7891' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='42.5703' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='61.3594' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='98.9297' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80.1484' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='117.719' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='37' y='5' width='66' height='38' rx='2' fill='%23BBBFC3'></rect></svg>";
const lg5="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A%09<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'/>%0A%09<rect x='40.25' y='27.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='8.0' y='8.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='40.25' y='8.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='72.5' y='8.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='104.75' y='8.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='8.0' y='27.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='104.75' y='27.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='8.0' y='46.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='104.75' y='46.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='8.0' y='65.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='40.25' y='65.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='72.5' y='65.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='104.75' y='65.0' width='27.25' height='15.0' rx='2' fill='%23BBBFC3'/>%0A</svg>";
const lg6="data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'></rect>%0A<rect x='43' y='4' width='55' height='39' rx='2.51724' fill='%23BBBFC3'></rect>%0A<rect x='119' y='45' width='17' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='99' y='45' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80' y='45' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='62' y='45' width='17' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='43' y='45' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='24' y='45' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='45' width='17' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='119' y='18' width='17' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='99' y='18' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='24' y='18' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='18' width='17' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='119' y='4' width='17' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='99' y='4' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='24' y='4' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='4' width='17' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='119' y='59' width='17' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='99' y='59' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80' y='59' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='62' y='59' width='17' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='43' y='59' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='24' y='59' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='59' width='17' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='119' y='32' width='17' height='11' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='99' y='32' width='18' height='11' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='24' y='32' width='18' height='11' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='32' width='17' height='11' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='119' y='73' width='17' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='99' y='73' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80' y='73' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='62' y='73' width='17' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='43' y='73' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='24' y='73' width='18' height='12' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='73' width='17' height='12' rx='2' fill='%23BBBFC3'></rect></svg>";


const images2 = [
  {layout: "4:3", imageUrl: "./images/viewall/Adaptive1.PNG", Descrption: "ancdd"},
  {layout: "1:0", imageUrl: "./images/viewall/sf1.PNG", Descrption: "main speaker only"},
  {layout: "1:1", imageUrl: "./images/viewall/sf2.PNG", Descrption: "main speaker and up to 1 previous speakers"},
  {layout: "1:7", imageUrl: "./images/viewall/sf3.PNG", Descrption: "main speaker and up to 7 previous speakers"},
  {layout: "2:0", imageUrl: "./images/viewall/es1.PNG", Descrption: "2 main speakers only"},
  {layout: "3:0", imageUrl: "./images/viewall/es2.PNG", Descrption: "3 main speakers only"},
  {layout: "4:0", imageUrl: "./images/viewall/es3.PNG", Descrption: "2x2 layout, up to a maximum of 4 speakers"},
  {layout: "9:0", imageUrl: "./images/viewall/es4.PNG", Descrption: "3x3 layout, up to a maximum of 9 speakers"},
  {layout: "16:0", imageUrl: "./images/viewall/es5.PNG", Descrption: "4x4 layout, up to a maximum of 16 speakers"},
  {layout: "20:0", imageUrl: "./images/viewall/es6.PNG", Descrption: "4x5 layout, up to a maximum of 20 speakers"},
  {layout: "2:18", imageUrl: "./images/viewall/lg1.PNG", Descrption: "two main speakers and up to 18 other participants"},
  {layout: "2:8", imageUrl: "./images/viewall/lg2.PNG", Descrption: "two main speakers and up to 8 other participants"},
  {layout: "1:9", imageUrl: "./images/viewall/lg3.PNG", Descrption: "one main speaker and up to 9 other participants"},
  {layout: "1:18", imageUrl: "./images/viewall/lg4.PNG", Descrption: "one main speakers and up to 18 other participants"},
  {layout: "1:12", imageUrl: "./images/viewall/lg5.PNG", Descrption: "large main speaker and up to 12 other participants"},
  {layout: "1:19", imageUrl: "./images/viewall/lg6.PNG", Descrption: "one main speakers and up to 19 other participants"},
];

const images = [
  {layout: "4:3", imageUrl: adaptive, Descrption: "ancdd"},
  {layout: "1:0", imageUrl: sf1, Descrption: "main speaker only"},
  {layout: "1:1", imageUrl: sf2, Descrption: "main speaker and up to 1 previous speakers"},
  {layout: "1:7", imageUrl: sf3, Descrption: "main speaker and up to 7 previous speakers"},
  {layout: "2:0", imageUrl: es1, Descrption: "2 main speakers only"},
  {layout: "3:0", imageUrl: es2, Descrption: "3 main speakers only"},
  {layout: "4:0", imageUrl: es3, Descrption: "2x2 layout, up to a maximum of 4 speakers"},
  {layout: "9:0", imageUrl: es4, Descrption: "3x3 layout, up to a maximum of 9 speakers"},
  {layout: "16:0", imageUrl: es5, Descrption: "4x4 layout, up to a maximum of 16 speakers"},
  {layout: "20:0", imageUrl: es6, Descrption: "4x5 layout, up to a maximum of 20 speakers"},
  {layout: "2:18", imageUrl: lg1, Descrption: "two main speakers and up to 18 other participants"},
  {layout: "2:8", imageUrl: lg2, Descrption: "two main speakers and up to 8 other participants"},
  {layout: "1:9", imageUrl: lg3, Descrption: "one main speaker and up to 9 other participants"},
  {layout: "1:18", imageUrl: lg4, Descrption: "one main speakers and up to 18 other participants"},
  {layout: "1:12", imageUrl: lg5, Descrption: "large main speaker and up to 12 other participants"},
  {layout: "1:19", imageUrl: lg6, Descrption: "one main speakers and up to 19 other participants"},
];
const headerImage= "data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%23ffffff' stroke='%23BBBFC3'></rect>%0A<rect x='5' y='5' width='63' height='39' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='72' y='5' width='63' height='39' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='23.7891' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='23.7891' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='42.5703' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='42.5703' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='61.3594' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='61.3594' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='98.9297' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='98.9297' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80.1484' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80.1484' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='117.719' y='59.9163' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='117.719' y='47' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='5' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='23.7891' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='42.5703' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='61.3594' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='98.9297' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='80.1484' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect>%0A<rect x='117.719' y='73.4229' width='17.2832' height='11.5771' rx='2' fill='%23BBBFC3'></rect></svg>";

const Presenter = ({pLayout}) => {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleImageClick = (image) => {
    pLayout(image.layout);

    setSelectedImage(image);
   
  };

  const toggleExpandCollapse = () => {
    setExpanded(!expanded);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleSeeAllClick = () => {
    navigate("/view-all");
  };

  return (
    <div className="expand-collapse-container">
      <div className="header">
        {!expanded ? (
          <>
            <span className="expand-button" onClick={toggleExpandCollapse}>
              <MdOutlineKeyboardArrowRight /> Presenter Layout
            </span>
            <span className="">
              <img className="header-image" src={headerImage}></img>
            </span>
          </>
        ) : (
          <>
            <span className="collapse-button" onClick={toggleExpandCollapse}>
              <MdOutlineKeyboardArrowDown /> Presenter Layout
            </span>
            <span className="see-all" onClick={handleSeeAllClick}>
              See All
            </span>
          </>
        )}
      </div>
      {expanded && (
        <div className="image-gallery">
          <button className="nav-button" onClick={handlePrev}>
            &lt;
          </button>
          <div className="images">
            {images
              .slice(currentImageIndex, currentImageIndex + 7)
              .map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={`Image ${index + 1}`}
                  onClick={()=>handleImageClick(image)}
                  className = "zoom-image"
                  style={{ border: selectedImage?.imageUrl === image.imageUrl ? '2px solid blue' : 'none'}}
                />
              ))}
          </div>
          <button className="nav-button" onClick={handleNext}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Presenter;