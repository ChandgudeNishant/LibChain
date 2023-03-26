import React from 'react';
//import styled from "styled-components";
//mport Logo from './logo.jpg';
//import Logo from "../Sanjivani.png";
import Certificate from "./certificate.jpg";
export default function Verify() {

  return(
    <>
    <table border="1">
        <tbody>
            <tr>
                <td>Name of Student</td>
                <td rowSpan={3}>
                <img src={Certificate} alt="certificate.jpg" width={500} height={500} />
                </td>
            </tr>
            <tr>
                <td>Name of the Course</td>
            </tr>
            <tr>
                <td>Name of the Organization</td>
            </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <input type="submit" value="VERIFY" />
                    </td>
                </tr>    
            </tfoot>
        </table>
    </>
  );
}