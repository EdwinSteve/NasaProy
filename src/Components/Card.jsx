import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  const [imageUrl, setImageUrl] = useState(null);

  const [page, setPage] = useState(null);

  useEffect(() => {
    getImage("https://shadowcam.im-ldi.com/ckeditor_assets/pictures/1324/content_spudis_1100x1100_f.png");
  }, []);

  const getImage = (url) => {
      setImageUrl(url);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      {imageUrl && (
        <CardMedia
          sx={{ height: 140 }}
          image={imageUrl}
          title="Spudis Crater PSR"
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Spudis Crater PSR
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Spudis crater was named to honor the many significant contributions made by Dr. 
          Paul Spudis. Paul was a tireless advocate for lunar science and exploration; 
          some of his ideas are preserved on the Smithsonian Magazine web portal and his blog.
        </Typography>
      </CardContent>
      <CardActions>
        <Button href='https://web.whatsapp.com/' target='_blank' size="small">Share</Button>
        <Button href='https://shadowcam.im-ldi.com/posts/1303' target='_blank'>Learn More</Button>
      </CardActions>
    </Card>
  );
}
