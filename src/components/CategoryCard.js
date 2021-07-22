import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';


function CategoryCard({image, onUpdateCategories}) {
    const [ selected, setSelected ] = useState(false);
    
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          minWidth: 300,
          width: '100%',
        },
        image: {
          position: 'relative',
          height: 150,
          marginLeft: "20%",
          width: "60%", 
          [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
            marginLeft: "0%"
          },
          '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
              opacity: 0.8,
            },
            '& $imageMarked': {
              opacity: 0.5,
            },
            '& $imageTitle': {
              border: '4px solid currentColor',
            },
          },
        },
        focusVisible: {},
        imageButton: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.common.white,
          borderRadius: "20px", 
          boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)"
        },
        imageSrc: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          borderRadius: "20px", 
          boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.2)"
        },
        imageBackdrop: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: theme.palette.common.black,
          opacity: selected ? 1 : 0,
          transition: theme.transitions.create('opacity'),
          borderRadius: "20px", 
          boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.4)"
        },
        imageTitle: {
          position: 'relative',
          padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
        },
        imageMarked: {
          height: 3,
          width: 18,
          backgroundColor: theme.palette.common.white,
          position: 'absolute',
          bottom: -2,
          left: 'calc(50% - 9px)',
          transition: theme.transitions.create('opacity'),
          borderRadius: "20px", 
        },
      }));
    const classes = useStyles();

    const handleSelected = (category) => {
        setSelected(!selected)
        onUpdateCategories(category)
    }
   
    return (
        <div>
            <ButtonBase
                focusRipple
                key={image.title}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                onClick={() => handleSelected(image.title)}
                // disableRipple
            >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
        </div>
    )
}

export default CategoryCard