exports.orderTemplate=(data)=>{
    return str=`
        <div style="display: block;margin-left: auto;margin-right: auto;width: 50%;">
            <h3 style="display: block;margin-left: auto;margin-right: auto;width: 18%;"><img src="../../../src/assets/logo/HomeLogo.png"  style="border-radius:1rem;" height="40" width="40" alt="flipzon"/> <span style="display:flex;margin-top: -2rem;margin-left: 3rem;align-items: center;">FLIPZON</span></h3>
            <hr>
            <h3>Welcome ${data.name},</h3>
            <p>
                Your order is placed successfully, Will let you know once the shipped date and delivery date has been set.
            </p>
            <strong>your order details :</strong>
            <table style="display: block;margin-left: auto;margin-right: auto;width: 50%;line-height: 2rem;">
                <tr>
                    <td>Product Name</td>
                    <td>:</td>
                    <td>${data.productname}</td>
                </tr>
                <tr>
                    <td>Quantity</td>
                    <td>:</td>
                    <td>${data.quantity}</td>
                </tr>
                <tr>
                    <td>Total Rate</td>
                    <td>:</td>
                    <td>${data.rate}</td>
                </tr>
                <tr>
                    <td>Mode Of payment</td>
                    <td>:</td>
                    <td>${data.mode}</td>
                </tr>
            </table>
            <button style="display: block;margin-left: auto;margin-right: auto;width: 20%;margin-top: 1rem;cursor: pointer;border-radius:0.5rem;background-color: lightblue;border: none;padding: .5rem;"><a style="text-decoration: none;" href="${data.url}">Track Order</a></button>
        </div>
    `
}