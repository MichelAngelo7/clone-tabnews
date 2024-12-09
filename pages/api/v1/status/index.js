function status(request, response) {
  response.status(200).json({ chave: "Não é fácil ficar no top" });
}

export default status;
