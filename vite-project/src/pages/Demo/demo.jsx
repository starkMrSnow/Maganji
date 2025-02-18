import React from 'react';
import './Demo.css';
import { FaBars } from "react-icons/fa";

export default function Demo() { 
  return (
    <div>
      <div>
        header
      </div>
      <div>
        Body
        <FaBars />
      </div>
      <div>
        footer
      </div>
    </div>
  );
}