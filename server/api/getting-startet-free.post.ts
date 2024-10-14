import { Resend } from 'resend';
import GettingStartetFree from '~~/server/emails/GettingStartetFree.vue';
import { render } from '@vue-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  const { email, name, title } = await readBody(event)

  if (!email || !name || !title) {
    throw createError({
      statusCode: 422,
      message: "Missing parameters.",
    })
  }
  const data = await useStorage('assets:server').getItemRaw('chatgpt-ai-template-main.zip')
  const html = await render(GettingStartetFree,{
    title: title,
    name: name
  },{
    pretty: true,
  });
  
  try {
    await resend.emails.send({
      from: 'Zunder <no-reply@zunder.ai>',
      to: [email],
      subject: title,
      html: html,
      attachments: [
        {content: data, filename: 'chatgpt-ai-template-main.zip'}
      ]
    });
  } catch (error) {
    return { error }
  }
})