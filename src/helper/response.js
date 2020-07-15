module.exports = (response) => {
  return {
    status: response.status || false,
    message: response.msg || null,
    result: response.data || {},
    options: response.options || {}
  }
}