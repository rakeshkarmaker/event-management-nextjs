import Form from 'next/form'

const Contactus = () => {
  return (
    <div>
        <h1>Contact Us</h1> 
        <p>If you have any questions, feel free to reach out to us.</p>
        
        <Form action="/search">
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>

    </div>

  )
}

export default Contactus