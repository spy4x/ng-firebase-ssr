import {Component} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {map, switchMap, tap} from 'rxjs/operators';
import {Article} from '../article.interface';
import {unwrapDocSnapshotChanges} from '../firestore.helper';


@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent {
  article$ = this.activatedRoute.params.pipe(
    map(p => p['id']),
    switchMap(id => this.db.doc(`articles/${id}`).snapshotChanges()),
    map(unwrapDocSnapshotChanges),
    tap((article: Article) => {
      this.title.setTitle(`@spy4x Blog - ${article.title}`);
      this.seo.addTags([
        {
          name: 'author',
          content: article.author
        },
        {
          name: 'keywords',
          content: article.tags.join(',')
        },
        {
          name: 'description',
          content: article.title
        },

        // Twitter card
        {
          name: 'twitter:card',
          content: article.title
        },
        {
          name: 'twitter:site',
          content: 'https://sp-ng-blog.firebaseapp.com/articles/' + article.id
        },
        {
          name: 'twitter:title',
          content: article.title
        },
        {
          name: 'twitter:description',
          content: article.description
        },
        {
          name: 'twitter:creator',
          content: '@spy4x'
        },
        {
          name: 'twitter:image',
          content: article.image
        },

        // Open Graph
        {
          property: 'og:title',
          content: article.title
        },
        {
          property: 'og:type',
          content: 'article'
        },
        {
          property: 'og:article:published_time',
          content: article.createdAt.toISOString()
        },
        {
          property: 'og:article:author',
          content: article.author
        },
        {
          property: 'og:article:section',
          content: 'technology'
        },
        ...(article.tags.map(tag => ({
          property: 'og:article:tag',
          content: tag
        }))),
        {
          property: 'og:url',
          content: 'https://sp-ng-blog.firebaseapp.com/articles/' + article.id
        },
        {
          property: 'og:image',
          content: article.image
        },
        {
          property: 'og:image:alt',
          content: article.title
        },
        {
          property: 'og:description',
          content: article.description
        },
        {
          property: 'og:site_name',
          content: '@spy4x Blog'
        },
      ]);
    })
  );

  constructor(private db: AngularFirestore,
              private activatedRoute: ActivatedRoute,
              private seo: Meta,
              private title: Title) {
  }

}
