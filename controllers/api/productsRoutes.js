const router = require('express').Router();
const {Product} = require('../../models');

router.get("/", async (req, res) => {
    try {
      const productData = await Product.findAll({
        attributes: ['title','description','price'],
      });
      
      const products = productData.map((data)=>data.get({plain:true}))
      console.log(products);
      res.status(200).json(products)
      // render('homepage', products)
    } catch (err) {
      res.status(500).json(err);
    }
});
  
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
    });
  
    if (!productData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }

    res.status(200).json(productData);
    // render('homepage', products)
   } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
Product.create(req.body)
  .then((product) => {
    res.status(200).json(product);
    console.log("session creation success");
  })
  .then((productIds) => {
    res.status(200).json(productIds);
  })
  .catch((err) => {
    console.log(err);
     res.status(400).json(err);
  });
});
  

  router.put('/:id', (req, res) => {
    
    Product.update(
      {
        title: req.body.name,
        description: req.body.description,
        price: req.body.price,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedProduct) => {
        res.json(updatedProduct);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });
  
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
  
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  
module.exports = router;