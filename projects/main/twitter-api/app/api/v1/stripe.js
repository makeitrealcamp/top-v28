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
