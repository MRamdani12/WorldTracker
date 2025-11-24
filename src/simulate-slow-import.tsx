// simulate-slow-import.js (temporary)
export default function Simulate() {
    console.log("Login module top-level executed");
    return function Login() {
        console.log("Login component render");
        return <div>LOGIN FORM</div>;
    };
}
