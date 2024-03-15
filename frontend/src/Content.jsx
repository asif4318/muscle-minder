const Content = () => {
  return (
    <main>
      Muscle Minder Login
      <input
      autoFocus
      id='username'
      type='text'
      placeholder='Username'
      required
      />
      <input
      id='password'
      type='text'
      placeholder='Password'
      required
      />
      <button
      type="submit"
      >
        Log In
      </button>
    </main>
  )
}

export default Content
