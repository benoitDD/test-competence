export const schema = `
  type Query {
    troppers: [Tropper]
    vehicules: [Vehicule]
    vehicule(id: String): Vehicule
    tropper(id: String): Tropper
  }
  
  """A tropper."""
  type Tropper {
    """The tropper name."""
    name: String!
  
    """
    Its vehicules
    """
    vehicules: [Vehicule]
  }

  type Vehicule {
    """The vehicule name."""
    name: String
  }
`
