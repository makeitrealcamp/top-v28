import stripe from 'stripe';

const stripeAPI = stripe(process.env.STRIPE_SECRET_API);

export async function checkoutSession(req, res, next) {
  const { body = {} } = req;
  const { line_items, customer_email } = body;

  try {
    const session = await stripeAPI.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.WEB_URL}/blue/success?session_id={CHECKOUT_SESSION_ID}`,
      customer_email,
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
    });

    res.json(session);
  } catch (error) {
    next(error);
  }
}

export async function validateCheckoutSession(req, res, next) {
  const { params = {} } = req;
  const { session_id } = params;

  try {
    const session = await stripeAPI.checkout.sessions.retrieve(session_id);
    res.json(session);
  } catch (error) {
    next(error);
  }
}

export async function payments(request, response, next) {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripeAPI.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event) {
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(paymentIntent);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log(paymentMethod);
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  } else {
    next({
      status: 400,
      message: 'Event error',
    });
  }
}
